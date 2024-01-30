import Karyawan from "../../models/Karyawan";
import Kehadiran from "../../models/Kehadiran";
import { generateAccessToken } from "../../utils/JWT";
import response from "../response";
import bcrypt from "bcrypt"
import fs from "fs"
import cron from "node-cron"


export async function GetAllKaryawan(req, res) {
    try {
      await Karyawan.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },include:[{model: Kehadiran, as: "kehadiran", attributes:{exclude:["createdAt", "updatedAt", "ownerId"]}}]
      }).then((result) => {
        res.json(result)
      });
    } catch (error) {
      response(500, "server failed to get admin", { error: error.message }, res);
    }
}

export async function GetKaryawanByPk(req, res) {
    try {
      let karyawanId = req.params.id
      await Karyawan.findByPk(karyawanId,{
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },include:[{model: Kehadiran, as: "kehadiran", attributes:{exclude:["createdAt", "updatedAt", "ownerId"]}}]
      }).then((result) => {
        res.json(result)
      });
    } catch (error) {
      response(500, "server failed to get admin", { error: error.message }, res);
    }
}

export async function CreateKaryawan(req, res) {
    try {
      let karyawanBody = req.body;
      // hash password input before save into database
      await bcrypt.hash(karyawanBody.password, 10).then((hash) => {
        karyawanBody.password = hash
        Karyawan.create(karyawanBody).then((respon) => {
          res.status(201).json(respon)
        });
      });
    } catch (error) {
      response(500,"server failed to create new user",{ error: error.message },res
      );
    }
}

export async function EditKaryawan(req, res) {
  try {
    let karyawanId = req.params.id
    let karyawanBody = req.body;
    let KARYAWAN = await Karyawan.findByPk(karyawanId)

    if(req.files.length !== 0){
      if(KARYAWAN.foto_profile){
        const fileToDelete = `public/files/uploads/${KARYAWAN.foto_profile.split("uploads/")[1]}`
        if (fs.existsSync(fileToDelete)) {
          try {
            fs.unlinkSync(fileToDelete);
            console.log(`File ${KARYAWAN.foto_profile.split("uploads/")[1]} deleted successfully.`);
          } catch (err) {
            console.error(`Error deleting file ${KARYAWAN.foto_profile.split("uploads/")[1]}: ${err}`);
          }
        } else {
          console.log(`File ${KARYAWAN.foto_profile.split("uploads/")[1]} not found.`);
        } 
      }
      // karyawanBody.foto_profile = `${req.protocol + "://" + req.get("host")}/files/uploads/${req.files[0].filename}`
      karyawanBody.foto_profile = `https://6hgnnxwq-3636.asse.devtunnels.ms/files/uploads/${req.files[0].filename}`
    }

    if(karyawanBody.password && karyawanBody.password.length !== 0){
      return await bcrypt.hash(karyawanBody.password, 10).then((hash) => {
        karyawanBody.password = hash
        KARYAWAN.update(karyawanBody)
        return res.json(KARYAWAN)
      });
    }else{
      karyawanBody.password = KARYAWAN.password
      KARYAWAN.update(karyawanBody)
      return res.json(KARYAWAN)
    }

    // hash password input before save into database
  } catch (error) {
      response(500,"server failed to create new user",{ error: error.message },res);
  }
}

export async function DeleteKaryawan(req, res) {
  try {
    let karyawanId = req.params.id
    let KARYAWAN = await Karyawan.findByPk(karyawanId)
    KARYAWAN.destroy()
    res.json("Success Delete Karyawan")
  } catch (error) {
      response(500,"server failed to create new user",{ error: error.message },res);
  }
}





export async function LoginKaryawan(req, res) {
  try {
    const { nik, password } = req.body;
    const admin = await Karyawan.findOne({where: {nik: nik}});
    if (admin == null) return res.status(404).json({ error: "Karyawan not found" });

    const dbPassword = admin.password;
    bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {
        res.status(400).json({ error: "wrong username and password combination" });
      } else {
        // Generate login-token
        const accessToken = generateAccessToken(admin);
        res.cookie("login-token", accessToken, {
          httpOnly: true
        });

        res.status(200).json({ route: "/admin", status: "success" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function LogoutKaryawan(req, res) {
  res.clearCookie("login-token");
  res.clearCookie("mega-token");
  res.redirect("/login");
}

export async function CheckinKaryawan(req, res) {
  try {
    const karyawanId = req.params.id;
    const karyawan = await Karyawan.findByPk(karyawanId)

    if (karyawan == null) return res.status(404).json({ error: "Karyawan not found" });
    
    
    const KEHADIRAN = await Kehadiran.create({
      tanggal: getFormatedToday(),
      jam_masuk: getWIBTime(),
      lokasi: await getCityFromIP(),
      status_kehadiran: true
    })
    karyawan.addKehadiran(KEHADIRAN)
    res.json(KEHADIRAN)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Cornjob untuk membuat karyawan yang tidak absen "Tidak Hadir"
// Cornjob ini di panggil tiap jam 11:30 malam
cron.schedule('30 23 * * *', () => {
  CronAutoTidakHadir()
});

async function CronAutoTidakHadir(){
  try {
    const allKaryawan = await Karyawan.findAll()
    
    allKaryawan.forEach(async karyawan => {
      const KARYAWAN_KEHADIRAN = await karyawan.getKehadiran();
      const HADIR = KARYAWAN_KEHADIRAN.find(kehadiran => kehadiran.tanggal == getFormatedToday())
      
      if(!HADIR){
        const KEHADIRAN = await Kehadiran.create({
          tanggal: getFormatedToday(),
          jam_masuk: "-",
          lokasi: await getCityFromIP(),
          status_kehadiran: false
        })
        karyawan.addKehadiran(KEHADIRAN)
      }
    })
  } catch (error) {
    console.log(error);
  }
}

function getFormatedToday() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Ingat, bulan dimulai dari 0 (Januari) hingga 11 (Desember)
  const year = today.getFullYear();

  // Format tanggal dengan nol di depan jika perlu
  const formattedDay = (day < 10) ? `0${day}` : day;
  const formattedMonth = (month < 10) ? `0${month}` : month;

  const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
  return formattedDate
}

function getWIBTime() {
  const now = new Date();
  const wibTime = now.toLocaleTimeString('en-ID', { timeZone: 'Asia/Jakarta' });

  return wibTime;
}

async function getCityFromIP() {
  try {
    const response = await fetch('https://ipinfo.io/json');
    const data = await response.json();
    return data.city;
  } catch (error) {
    console.error('Error fetching IP information:', error.message);
    // Mengembalikan nilai default atau nilai yang sesuai dengan kebutuhan Anda
    return null;
  }
}

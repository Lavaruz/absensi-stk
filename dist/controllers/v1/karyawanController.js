"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckinKaryawan = exports.LogoutKaryawan = exports.LoginKaryawan = exports.DeleteKaryawan = exports.EditKaryawan = exports.CreateKaryawan = exports.GetKaryawanByPk = exports.GetAllKaryawan = void 0;
const Karyawan_1 = __importDefault(require("../../models/Karyawan"));
const Kehadiran_1 = __importDefault(require("../../models/Kehadiran"));
const JWT_1 = require("../../utils/JWT");
const response_1 = __importDefault(require("../response"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const fs_1 = __importDefault(require("fs"));
const node_cron_1 = __importDefault(require("node-cron"));
async function GetAllKaryawan(req, res) {
    try {
        await Karyawan_1.default.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            }, include: [{ model: Kehadiran_1.default, as: "kehadiran", attributes: { exclude: ["createdAt", "updatedAt", "ownerId"] } }]
        }).then((result) => {
            res.json(result);
        });
    }
    catch (error) {
        (0, response_1.default)(500, "server failed to get admin", { error: error.message }, res);
    }
}
exports.GetAllKaryawan = GetAllKaryawan;
async function GetKaryawanByPk(req, res) {
    try {
        let karyawanId = req.params.id;
        await Karyawan_1.default.findByPk(karyawanId, {
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            }, include: [{ model: Kehadiran_1.default, as: "kehadiran", attributes: { exclude: ["createdAt", "updatedAt", "ownerId"] } }]
        }).then((result) => {
            res.json(result);
        });
    }
    catch (error) {
        (0, response_1.default)(500, "server failed to get admin", { error: error.message }, res);
    }
}
exports.GetKaryawanByPk = GetKaryawanByPk;
async function CreateKaryawan(req, res) {
    try {
        let karyawanBody = req.body;
        // hash password input before save into database
        await bcrypt_1.default.hash(karyawanBody.password, 10).then((hash) => {
            karyawanBody.password = hash;
            Karyawan_1.default.create(karyawanBody).then((respon) => {
                res.status(201).json(respon);
            });
        });
    }
    catch (error) {
        (0, response_1.default)(500, "server failed to create new user", { error: error.message }, res);
    }
}
exports.CreateKaryawan = CreateKaryawan;
async function EditKaryawan(req, res) {
    try {
        let karyawanId = req.params.id;
        let karyawanBody = req.body;
        let KARYAWAN = await Karyawan_1.default.findByPk(karyawanId);
        if (req.files.length !== 0) {
            if (KARYAWAN.foto_profile) {
                const fileToDelete = `public/files/uploads/${KARYAWAN.foto_profile.split("uploads/")[1]}`;
                if (fs_1.default.existsSync(fileToDelete)) {
                    try {
                        fs_1.default.unlinkSync(fileToDelete);
                        console.log(`File ${KARYAWAN.foto_profile.split("uploads/")[1]} deleted successfully.`);
                    }
                    catch (err) {
                        console.error(`Error deleting file ${KARYAWAN.foto_profile.split("uploads/")[1]}: ${err}`);
                    }
                }
                else {
                    console.log(`File ${KARYAWAN.foto_profile.split("uploads/")[1]} not found.`);
                }
            }
            // karyawanBody.foto_profile = `${req.protocol + "://" + req.get("host")}/files/uploads/${req.files[0].filename}`
            karyawanBody.foto_profile = `https://6hgnnxwq-3636.asse.devtunnels.ms/files/uploads/${req.files[0].filename}`;
        }
        if (karyawanBody.password && karyawanBody.password.length !== 0) {
            return await bcrypt_1.default.hash(karyawanBody.password, 10).then((hash) => {
                karyawanBody.password = hash;
                KARYAWAN.update(karyawanBody);
                return res.json(KARYAWAN);
            });
        }
        else {
            karyawanBody.password = KARYAWAN.password;
            KARYAWAN.update(karyawanBody);
            return res.json(KARYAWAN);
        }
        // hash password input before save into database
    }
    catch (error) {
        (0, response_1.default)(500, "server failed to create new user", { error: error.message }, res);
    }
}
exports.EditKaryawan = EditKaryawan;
async function DeleteKaryawan(req, res) {
    try {
        let karyawanId = req.params.id;
        let KARYAWAN = await Karyawan_1.default.findByPk(karyawanId);
        KARYAWAN.destroy();
        res.json("Success Delete Karyawan");
    }
    catch (error) {
        (0, response_1.default)(500, "server failed to create new user", { error: error.message }, res);
    }
}
exports.DeleteKaryawan = DeleteKaryawan;
async function LoginKaryawan(req, res) {
    try {
        const { nik, password } = req.body;
        const admin = await Karyawan_1.default.findOne({ where: { nik: nik } });
        if (admin == null)
            return res.status(404).json({ error: "Karyawan not found" });
        const dbPassword = admin.password;
        bcrypt_1.default.compare(password, dbPassword).then((match) => {
            if (!match) {
                res.status(400).json({ error: "wrong username and password combination" });
            }
            else {
                // Generate login-token
                const accessToken = (0, JWT_1.generateAccessToken)(admin);
                res.cookie("login-token", accessToken, {
                    httpOnly: true
                });
                res.status(200).json({ route: "/admin", status: "success" });
            }
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.LoginKaryawan = LoginKaryawan;
async function LogoutKaryawan(req, res) {
    res.clearCookie("login-token");
    res.clearCookie("mega-token");
    res.redirect("/login");
}
exports.LogoutKaryawan = LogoutKaryawan;
async function CheckinKaryawan(req, res) {
    try {
        const karyawanId = req.params.id;
        const karyawan = await Karyawan_1.default.findByPk(karyawanId);
        if (karyawan == null)
            return res.status(404).json({ error: "Karyawan not found" });
        const KEHADIRAN = await Kehadiran_1.default.create({
            tanggal: getFormatedToday(),
            jam_masuk: getWIBTime(),
            lokasi: await getCityFromIP(),
            status_kehadiran: true
        });
        karyawan.addKehadiran(KEHADIRAN);
        res.json(KEHADIRAN);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.CheckinKaryawan = CheckinKaryawan;
// Cornjob untuk membuat karyawan yang tidak absen "Tidak Hadir"
// Cornjob ini di panggil tiap jam 11:30 malam
node_cron_1.default.schedule('30 23 * * *', () => {
    CronAutoTidakHadir();
});
async function CronAutoTidakHadir() {
    try {
        const allKaryawan = await Karyawan_1.default.findAll();
        allKaryawan.forEach(async (karyawan) => {
            const KARYAWAN_KEHADIRAN = await karyawan.getKehadiran();
            const HADIR = KARYAWAN_KEHADIRAN.find(kehadiran => kehadiran.tanggal == getFormatedToday());
            if (!HADIR) {
                const KEHADIRAN = await Kehadiran_1.default.create({
                    tanggal: getFormatedToday(),
                    jam_masuk: "-",
                    lokasi: await getCityFromIP(),
                    status_kehadiran: false
                });
                karyawan.addKehadiran(KEHADIRAN);
            }
        });
    }
    catch (error) {
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
    return formattedDate;
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
    }
    catch (error) {
        console.error('Error fetching IP information:', error.message);
        // Mengembalikan nilai default atau nilai yang sesuai dengan kebutuhan Anda
        return null;
    }
}
//# sourceMappingURL=karyawanController.js.map
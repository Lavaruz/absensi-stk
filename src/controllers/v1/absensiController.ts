import Absensi from "../../models/Absensi";
import Kehadiran from "../../models/Kehadiran";
import response from "../response";

export async function GetAbsensi(req, res) {
    try {
      await Absensi.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        }
      }).then((result) => {
        res.json(result)
      });
    } catch (error) {
      response(500, "server failed to get admin", { error: error.message }, res);
    }
}

export async function EditAbsensi(req, res) {
    try {
      const ASBENSI = await Absensi.findOne()
      ASBENSI.update(req.body)
      res.json(ASBENSI)
    } catch (error) {
      response(500, "server failed to get admin", { error: error.message }, res);
    }
}

async function CreateAbsensiIfNull(){
    const ABSENSI = await Absensi.findOne()
    if(!ABSENSI) await Absensi.create()
}
CreateAbsensiIfNull()
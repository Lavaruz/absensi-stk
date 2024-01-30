import Kehadiran from "../../models/Kehadiran";
import response from "../response";

export async function GetAllKehadiran(req, res) {
    try {
      await Kehadiran.findAll({
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

export async function GetKehadiranByPk(req, res) {
    try {
      let karyawanId = req.params.id
      await Kehadiran.findByPk(karyawanId,{
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        }
      }).then((result) => {
        res.json(result)
      });
    } catch (error) {
      response(500, "server failed to get admin", { error: error.message }, res);
    }
}
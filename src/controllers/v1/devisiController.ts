import Devisi from "../../models/Devisi";
import Karyawan from "../../models/Karyawan";
import response from "../response";
import bcrypt from "bcrypt"


export async function GetAllDevisi(req, res) {
    try {
      await Devisi.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      }).then((result) => {
        res.json(result)
      });
    } catch (error) {
      response(500, "server failed to get admin", { error: error.message }, res);
    }
}

export async function GetDevisiByPk(req, res) {
    try {
      let devisiId = req.params.id
      await Devisi.findByPk(devisiId,{
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      }).then((result) => {
        res.json(result)
      });
    } catch (error) {
      response(500, "server failed to get admin", { error: error.message }, res);
    }
}

export async function CreateDevisi(req, res) {
    try {
        let devisiBody = req.body;
        // hash password input before save into database
        let DEVISI = await Devisi.create(devisiBody)
        res.status(201).json(DEVISI)
    } catch (error) {
        response(500,"server failed to create new user",{ error: error.message },res);
    }
}

export async function EditDevisi(req, res) {
    try {
      let devisiId = req.params.id
      let devisiBody = req.body;
      // hash password input before save into database
      let DEVISI = await Devisi.findByPk(devisiId)
      DEVISI.update(devisiBody)
      res.status(200).json(DEVISI)
    } catch (error) {
        response(500,"server failed to create new user",{ error: error.message },res);
    }
}

export async function DeleteDevisi(req, res) {
  try {
    let devisiId = req.params.id
    let DEVISI = await Devisi.findByPk(devisiId)
    DEVISI.destroy()
    res.json("Success Delete Devisi")
  } catch (error) {
      response(500,"server failed to create new user",{ error: error.message },res);
  }
}
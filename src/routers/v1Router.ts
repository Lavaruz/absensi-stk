import express from "express";
import karyawanRouter from "./v1/karyawanRoute"
import devisiRouter from "./v1/devisiRouter"
import kehadiranRouter from "./v1/kehadiranRoute"
import absensiRouter from "./v1/absensiRoute"
import megaRouter from "./v1/megaRouter"

const v1Router = express.Router()

v1Router.use("/karyawan", karyawanRouter);
v1Router.use("/devisi", devisiRouter);
v1Router.use("/kehadiran", kehadiranRouter);
v1Router.use("/absensi", absensiRouter);
v1Router.use("/mega", megaRouter);

export default v1Router
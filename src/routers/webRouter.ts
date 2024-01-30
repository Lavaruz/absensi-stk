import express, {Response, Request} from "express";
import { validateTokenMegaWebiste, validateTokenWebiste } from "../utils/JWT";

const router = express.Router();

router.get("/", validateTokenWebiste, (req:Request, res:Response) => {
  res.redirect("/dashboard")
});
router.get("/login", (req:Request, res:Response) => {
  if (req.cookies["login-token"]) {
    res.redirect("/");
  } else {
    res.render("loginPage");
  }
});


router.get("/mega/login", (req:Request, res:Response) => {
  res.render("MegaLogin");
});
router.get("/mega/dashboard",validateTokenMegaWebiste, (req:Request, res:Response) => {
  res.render("MegaDashboard");
});
router.get("/mega/karyawan",validateTokenMegaWebiste, (req:Request, res:Response) => {
  res.render("MegaKaryawan");
});
router.get("/mega/devisi",validateTokenMegaWebiste, (req:Request, res:Response) => {
  res.render("MegaDevisi");
});
router.get("/mega/absensi",validateTokenMegaWebiste, (req:Request, res:Response) => {
  res.render("MegaAbsensi");
});
router.get("/mega/absensi/:id",validateTokenMegaWebiste, (req:Request, res:Response) => {
  res.render("MegaAbsensiDetail");
});

router.get("/dashboard",validateTokenWebiste, (req:Request, res:Response) => {
  res.render("KaryawanDashboard",{user:req.user});
});
router.get("/profile",validateTokenWebiste, (req:Request, res:Response) => {
  res.render("KaryawanProfile",{user:req.user});
});
router.get("/absensi",validateTokenWebiste, (req:Request, res:Response) => {
  res.render("KaryawanAbsensi",{user:req.user});
});


export = router;

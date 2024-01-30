import express from "express"
import { validateTokenAPI } from "../../utils/JWT";
import limiter from "../../utils/RateLimiter";
import { CheckinKaryawan, CreateKaryawan, DeleteKaryawan, EditKaryawan, GetAllKaryawan, GetKaryawanByPk, LoginKaryawan, LogoutKaryawan } from "../../controllers/v1/karyawanController";

const router = express.Router()

router.get("/", GetAllKaryawan);
router.get("/:id", GetKaryawanByPk);
router.post("/", CreateKaryawan);
router.post("/login", LoginKaryawan);
router.post("/logout", LogoutKaryawan);
router.post("/:id/checkin", CheckinKaryawan);
router.put("/:id", EditKaryawan);
router.delete("/:id", DeleteKaryawan);

export default router;

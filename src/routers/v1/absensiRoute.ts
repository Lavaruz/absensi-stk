import express from "express"
import { validateTokenAPI } from "../../utils/JWT";
import limiter from "../../utils/RateLimiter";
import { EditAbsensi, GetAbsensi } from "../../controllers/v1/absensiController";

const router = express.Router()

router.get("/", GetAbsensi);
router.put("/", EditAbsensi);

export default router;

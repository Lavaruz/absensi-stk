import express from "express"
import { validateTokenAPI } from "../../utils/JWT";
import limiter from "../../utils/RateLimiter";
import { GetAllKehadiran, GetKehadiranByPk } from "../../controllers/v1/kehadiranController";

const router = express.Router()

router.get("/", GetAllKehadiran);
router.get("/:id", GetKehadiranByPk);

export default router;

import express from "express"
import { validateTokenAPI } from "../../utils/JWT";
import { CreateDevisi, DeleteDevisi, EditDevisi, GetAllDevisi, GetDevisiByPk } from "../../controllers/v1/devisiController";

const router = express.Router()

router.get("/", GetAllDevisi);
router.get("/:id", GetDevisiByPk);
router.post("/", CreateDevisi);
router.put("/:id", EditDevisi);
router.delete("/:id", DeleteDevisi);

export default router;

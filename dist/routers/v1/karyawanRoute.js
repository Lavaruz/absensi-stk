"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const karyawanController_1 = require("../../controllers/v1/karyawanController");
const router = express_1.default.Router();
router.get("/", karyawanController_1.GetAllKaryawan);
router.get("/:id", karyawanController_1.GetKaryawanByPk);
router.post("/", karyawanController_1.CreateKaryawan);
router.post("/login", karyawanController_1.LoginKaryawan);
router.post("/logout", karyawanController_1.LogoutKaryawan);
router.post("/:id/checkin", karyawanController_1.CheckinKaryawan);
router.put("/:id", karyawanController_1.EditKaryawan);
router.delete("/:id", karyawanController_1.DeleteKaryawan);
exports.default = router;
//# sourceMappingURL=karyawanRoute.js.map
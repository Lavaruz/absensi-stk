"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const absensiController_1 = require("../../controllers/v1/absensiController");
const router = express_1.default.Router();
router.get("/", absensiController_1.GetAbsensi);
router.put("/", absensiController_1.EditAbsensi);
exports.default = router;
//# sourceMappingURL=absensiRoute.js.map
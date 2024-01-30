"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const devisiController_1 = require("../../controllers/v1/devisiController");
const router = express_1.default.Router();
router.get("/", devisiController_1.GetAllDevisi);
router.get("/:id", devisiController_1.GetDevisiByPk);
router.post("/", devisiController_1.CreateDevisi);
router.put("/:id", devisiController_1.EditDevisi);
router.delete("/:id", devisiController_1.DeleteDevisi);
exports.default = router;
//# sourceMappingURL=devisiRouter.js.map
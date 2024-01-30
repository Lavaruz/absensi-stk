"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetKehadiranByPk = exports.GetAllKehadiran = void 0;
const Kehadiran_1 = __importDefault(require("../../models/Kehadiran"));
const response_1 = __importDefault(require("../response"));
async function GetAllKehadiran(req, res) {
    try {
        await Kehadiran_1.default.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
            }
        }).then((result) => {
            res.json(result);
        });
    }
    catch (error) {
        (0, response_1.default)(500, "server failed to get admin", { error: error.message }, res);
    }
}
exports.GetAllKehadiran = GetAllKehadiran;
async function GetKehadiranByPk(req, res) {
    try {
        let karyawanId = req.params.id;
        await Kehadiran_1.default.findByPk(karyawanId, {
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            }
        }).then((result) => {
            res.json(result);
        });
    }
    catch (error) {
        (0, response_1.default)(500, "server failed to get admin", { error: error.message }, res);
    }
}
exports.GetKehadiranByPk = GetKehadiranByPk;
//# sourceMappingURL=kehadiranController.js.map
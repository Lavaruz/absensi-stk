"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditAbsensi = exports.GetAbsensi = void 0;
const Absensi_1 = __importDefault(require("../../models/Absensi"));
const response_1 = __importDefault(require("../response"));
async function GetAbsensi(req, res) {
    try {
        await Absensi_1.default.findOne({
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
exports.GetAbsensi = GetAbsensi;
async function EditAbsensi(req, res) {
    try {
        const ASBENSI = await Absensi_1.default.findOne();
        ASBENSI.update(req.body);
        res.json(ASBENSI);
    }
    catch (error) {
        (0, response_1.default)(500, "server failed to get admin", { error: error.message }, res);
    }
}
exports.EditAbsensi = EditAbsensi;
async function CreateAbsensiIfNull() {
    const ABSENSI = await Absensi_1.default.findOne();
    if (!ABSENSI)
        await Absensi_1.default.create();
}
CreateAbsensiIfNull();
//# sourceMappingURL=absensiController.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDevisi = exports.EditDevisi = exports.CreateDevisi = exports.GetDevisiByPk = exports.GetAllDevisi = void 0;
const Devisi_1 = __importDefault(require("../../models/Devisi"));
const response_1 = __importDefault(require("../response"));
async function GetAllDevisi(req, res) {
    try {
        await Devisi_1.default.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        }).then((result) => {
            res.json(result);
        });
    }
    catch (error) {
        (0, response_1.default)(500, "server failed to get admin", { error: error.message }, res);
    }
}
exports.GetAllDevisi = GetAllDevisi;
async function GetDevisiByPk(req, res) {
    try {
        let devisiId = req.params.id;
        await Devisi_1.default.findByPk(devisiId, {
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        }).then((result) => {
            res.json(result);
        });
    }
    catch (error) {
        (0, response_1.default)(500, "server failed to get admin", { error: error.message }, res);
    }
}
exports.GetDevisiByPk = GetDevisiByPk;
async function CreateDevisi(req, res) {
    try {
        let devisiBody = req.body;
        // hash password input before save into database
        let DEVISI = await Devisi_1.default.create(devisiBody);
        res.status(201).json(DEVISI);
    }
    catch (error) {
        (0, response_1.default)(500, "server failed to create new user", { error: error.message }, res);
    }
}
exports.CreateDevisi = CreateDevisi;
async function EditDevisi(req, res) {
    try {
        let devisiId = req.params.id;
        let devisiBody = req.body;
        // hash password input before save into database
        let DEVISI = await Devisi_1.default.findByPk(devisiId);
        DEVISI.update(devisiBody);
        res.status(200).json(DEVISI);
    }
    catch (error) {
        (0, response_1.default)(500, "server failed to create new user", { error: error.message }, res);
    }
}
exports.EditDevisi = EditDevisi;
async function DeleteDevisi(req, res) {
    try {
        let devisiId = req.params.id;
        let DEVISI = await Devisi_1.default.findByPk(devisiId);
        DEVISI.destroy();
        res.json("Success Delete Devisi");
    }
    catch (error) {
        (0, response_1.default)(500, "server failed to create new user", { error: error.message }, res);
    }
}
exports.DeleteDevisi = DeleteDevisi;
//# sourceMappingURL=devisiController.js.map
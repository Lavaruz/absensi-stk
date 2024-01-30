"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const karyawanRoute_1 = __importDefault(require("./v1/karyawanRoute"));
const devisiRouter_1 = __importDefault(require("./v1/devisiRouter"));
const kehadiranRoute_1 = __importDefault(require("./v1/kehadiranRoute"));
const absensiRoute_1 = __importDefault(require("./v1/absensiRoute"));
const megaRouter_1 = __importDefault(require("./v1/megaRouter"));
const v1Router = express_1.default.Router();
v1Router.use("/karyawan", karyawanRoute_1.default);
v1Router.use("/devisi", devisiRouter_1.default);
v1Router.use("/kehadiran", kehadiranRoute_1.default);
v1Router.use("/absensi", absensiRoute_1.default);
v1Router.use("/mega", megaRouter_1.default);
exports.default = v1Router;
//# sourceMappingURL=v1Router.js.map
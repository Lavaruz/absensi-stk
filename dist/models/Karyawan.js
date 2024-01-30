"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require("."); // Pastikan Anda mengganti path sesuai dengan struktur direktori Anda
const Kehadiran_1 = __importDefault(require("./Kehadiran"));
class Karyawan extends sequelize_1.Model {
}
Karyawan.init({
    unique_id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    nama: sequelize_1.DataTypes.STRING,
    nik: sequelize_1.DataTypes.STRING,
    password: sequelize_1.DataTypes.STRING,
    telp: sequelize_1.DataTypes.STRING,
    email: sequelize_1.DataTypes.STRING,
    devisi: sequelize_1.DataTypes.STRING,
    foto_profile: sequelize_1.DataTypes.TEXT,
    // timestamps
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    tableName: "karyawan",
    sequelize: // Nama tabel di database
    _1.sequelize, // Instance Sequelize yang digunakan
});
Karyawan.hasMany(Kehadiran_1.default, {
    sourceKey: "unique_id",
    foreignKey: "ownerId",
    constraints: false,
    as: "kehadiran"
});
exports.default = Karyawan;
//# sourceMappingURL=Karyawan.js.map
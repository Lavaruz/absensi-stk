"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require("."); // Pastikan Anda mengganti path sesuai dengan struktur direktori Anda
class Kehadiran extends sequelize_1.Model {
}
Kehadiran.init({
    unique_id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    tanggal: sequelize_1.DataTypes.STRING,
    jam_masuk: sequelize_1.DataTypes.STRING,
    lokasi: sequelize_1.DataTypes.STRING,
    status_kehadiran: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    // timestamps
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    tableName: "kehadiran",
    sequelize: // Nama tabel di database
    _1.sequelize, // Instance Sequelize yang digunakan
});
exports.default = Kehadiran;
//# sourceMappingURL=Kehadiran.js.map
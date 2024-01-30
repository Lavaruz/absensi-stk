"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require("."); // Pastikan Anda mengganti path sesuai dengan struktur direktori Anda
class Absensi extends sequelize_1.Model {
}
Absensi.init({
    unique_id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    jam_masuk: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "08:00"
    },
    jam_keluar: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "09:00"
    },
    // timestamps
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    tableName: "absensi",
    sequelize: // Nama tabel di database
    _1.sequelize, // Instance Sequelize yang digunakan
});
exports.default = Absensi;
//# sourceMappingURL=Absensi.js.map
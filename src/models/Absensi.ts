import { DataTypes, Model, CreationOptional } from "sequelize";
import { sequelize } from "."; // Pastikan Anda mengganti path sesuai dengan struktur direktori Anda

class Absensi extends Model {
  declare unique_id: CreationOptional<number>;
  declare jam_masuk: string;
  declare jam_keluar: string;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

Absensi.init(
  {
    unique_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    jam_masuk: {
        type: DataTypes.STRING,
        defaultValue: "08:00"
    },
    jam_keluar: {
        type: DataTypes.STRING,
        defaultValue: "09:00"
    },

    // timestamps
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "absensi", // Nama tabel di database
    sequelize, // Instance Sequelize yang digunakan
  }
);
  
export default Absensi;
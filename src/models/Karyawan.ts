import { DataTypes, Model,Association, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, ModelDefined, Optional,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, HasOneSetAssociationMixin, } from "sequelize";
  import { sequelize } from "."; // Pastikan Anda mengganti path sesuai dengan struktur direktori Anda
import Kehadiran from "./Kehadiran";
  
  class Karyawan extends Model {
    declare unique_id: CreationOptional<number>;
    declare nama: string;
    declare nik: string;
    declare password: string;
    declare telp: string;
    declare email: string;
    declare devisi: string;
    declare foto_profile: string;

    declare addKehadiran: HasManyAddAssociationMixin<Kehadiran, number>
    declare addKehadirans: HasManyAddAssociationsMixin<Kehadiran, number>
    declare hasKehadiran: HasManyHasAssociationMixin<Kehadiran, number>
    declare removeKehadiran: HasManyRemoveAssociationsMixin<Kehadiran,number>
    declare getKehadiran: HasManyGetAssociationsMixin<Kehadiran>
    declare setKehadirans: HasManySetAssociationsMixin<Kehadiran,number>
  
    // createdAt can be undefined during creation
    declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    declare updatedAt: CreationOptional<Date>;
  }
  
  Karyawan.init(
    {
      unique_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      nama: DataTypes.STRING,
      nik: DataTypes.STRING,
      password: DataTypes.STRING,
      telp: DataTypes.STRING,
      email: DataTypes.STRING,
      devisi: DataTypes.STRING,
      foto_profile: DataTypes.TEXT,
  
      // timestamps
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "karyawan", // Nama tabel di database
      sequelize, // Instance Sequelize yang digunakan
    }
  );

  Karyawan.hasMany(Kehadiran, {
    sourceKey:"unique_id",
    foreignKey: "ownerId",
    constraints: false,
    as: "kehadiran"
  })
  
  export default Karyawan;
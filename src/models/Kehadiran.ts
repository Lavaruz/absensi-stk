import { DataTypes, Model,Association, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, ModelDefined, Optional,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, HasOneSetAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToManyHasAssociationMixin, BelongsToManyAddAssociationMixin, BelongsToManyRemoveAssociationMixin, } from "sequelize";
import { sequelize } from "."; // Pastikan Anda mengganti path sesuai dengan struktur direktori Anda
import Karyawan from "./Karyawan";

class Kehadiran extends Model {
  declare unique_id: CreationOptional<number>;
  declare tanggal: string;
  declare jam_masuk: string;
  declare lokasi: string;
  declare status_kehadiran: boolean;

  declare ownerId: ForeignKey<Karyawan['unique_id']>;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
}

Kehadiran.init(
  {
    unique_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    tanggal: DataTypes.STRING,
    jam_masuk: DataTypes.STRING,
    lokasi: DataTypes.STRING,
    status_kehadiran: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    // timestamps
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "kehadiran", // Nama tabel di database
    sequelize, // Instance Sequelize yang digunakan
  }
);
  
export default Kehadiran;
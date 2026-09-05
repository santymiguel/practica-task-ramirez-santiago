import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

export class RolesModel extends Model {}
RolesModel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "roles",
  },
);

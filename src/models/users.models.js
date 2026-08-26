import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

export class UsersModel extends Model {}
UsersModel.init(
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  },
);

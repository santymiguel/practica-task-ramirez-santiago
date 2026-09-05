import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

export class ProfilesModel extends Model {}
ProfilesModel.init(
  {
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "profiles",
  },
);

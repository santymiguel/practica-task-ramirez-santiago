import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

export class TasksModel extends Model {}
TasksModel.init(
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "task",
  },
);

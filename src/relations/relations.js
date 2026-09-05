import { TasksModel } from "../models/tasks.models.js";
import { UsersModel } from "../models/users.models.js";
import { ProfilesModel } from "../models/profiles.model.js";
import { RolesModel } from "../models/roles.model.js";

UsersModel.hasMany(TasksModel, { foreignKey: "user_id" });
TasksModel.belongsTo(UsersModel, { foreignKey: "user_id" });

UsersModel.hasOne(ProfilesModel, { foreignKey: "user_id" });
ProfilesModel.belongsTo(UsersModel, { foreignKey: "user_id" });

RolesModel.belongsToMany(UsersModel, {
  through: "RolesUsers",
  foreignKey: "role_id",
});
UsersModel.belongsToMany(RolesModel, {
  through: "RolesUsers",
  foreignKey: "user_id",
});

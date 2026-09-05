import express from "express";
import {
  crearRoles,
  crearRoleUser,
  obtenerRoles,
} from "../controllers/roles.controllers.js";

export const rolesRouter = express.Router();

rolesRouter.post("/", crearRoles);

rolesRouter.get("/", obtenerRoles);

rolesRouter.post("/user/:user_id/role/:role_id", crearRoleUser);

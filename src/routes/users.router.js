import express from "express";
import {
  obtenerUsuario,
  obtenerUsuarios,
} from "../controllers/users.controllers.js";

export const userRoutes = express.Router();

userRoutes.get("/", obtenerUsuarios);

userRoutes.get("/:id", obtenerUsuario);

userRoutes.put("/:id");

import express from "express";
import {
  borrarUsuario,
  crearUsuario,
  editarUsuario,
  obtenerUsuario,
  obtenerUsuarios,
} from "../controllers/users.controllers.js";

export const userRoutes = express.Router();

userRoutes.get("/", obtenerUsuarios);

userRoutes.get("/:id", obtenerUsuario);

userRoutes.post("/", crearUsuario);

userRoutes.put("/", editarUsuario);

userRoutes.delete("/:id", borrarUsuario);

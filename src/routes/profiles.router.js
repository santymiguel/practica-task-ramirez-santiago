import express from "express";
import {
  crearPerfil,
  obtenerPerfiles,
} from "../controllers/profiles.controllers.js";

export const profilesRouter = express.Router();

profilesRouter.post("/", crearPerfil);

profilesRouter.get("/", obtenerPerfiles);

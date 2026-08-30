import express from "express";
import {
  borrarTarea,
  crearTarea,
  editarTarea,
  obtenerTarea,
  obtenerTareas,
} from "../controllers/task.controllers.js";

export const taskRouter = express.Router();

taskRouter.get("/", obtenerTareas);

taskRouter.get("/:id", obtenerTarea);

taskRouter.post("/", crearTarea);

taskRouter.put("/:id", editarTarea);

taskRouter.delete("/:id", borrarTarea);

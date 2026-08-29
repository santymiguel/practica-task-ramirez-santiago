import express from "express";
import {
  borrarTarea,
  editarTarea,
  obtenerTareas,
} from "../controllers/task.controllers.js";

export const taskRouter = express.Router();

taskRouter.get("/", obtenerTareas);

taskRouter.put("/:id", editarTarea);

taskRouter.delete("/:id", borrarTarea);

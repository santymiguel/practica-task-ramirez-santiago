import express from "express";
import {
  crearTarea,
  obtenerTarea,
  obtenerTareas,
} from "../controllers/task.controllers.js";

export const taskRouter = express.Router();

taskRouter.get("/", obtenerTareas);

taskRouter.get("/:id", obtenerTarea);

taskRouter.post("/", crearTarea);

taskRouter.put("/:id");

taskRouter.delete("/:id");

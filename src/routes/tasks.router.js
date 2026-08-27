import express from "express";
import { editarTarea, obtenerTareas } from "../controllers/task.controllers";

export const taskRouter = express.Router();

taskRouter.get("/", obtenerTareas);

taskRouter.put("/:id", editarTarea);

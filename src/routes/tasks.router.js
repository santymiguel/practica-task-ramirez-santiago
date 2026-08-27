import express from "express";
import { obtenerTareas } from "../controllers/task.controllers";

export const taskRouter = express.Router();

taskRouter.get("/", obtenerTareas);

taskRouter.get("/:id");

taskRouter.get("/");

taskRouter.get("/:id");

taskRouter.get("/:id");

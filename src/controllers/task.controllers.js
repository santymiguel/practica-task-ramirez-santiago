import { TasksModel } from "../models/tasks.models.js";
import { Op } from "sequelize";

export async function obtenerTareas(req, res) {
  try {
    const tareas = await TasksModel.findAll();
    return res.status(200).json({ ok: true, status: 200, body: tareas });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al obtener las tareas",
      error: err.message,
    });
  }
}

export async function obtenerTarea(req, res) {
  try {
    const Id = req.params.id;
    if (isNaN(Id)) {
      return res
        .status(400)
        .json({ message: "La id ingresada debe ser un numero valido" });
    }
    const tarea = await TasksModel.findOne({ where: { id: Id } });
    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.status(200).json({ ok: true, status: 200, body: tarea });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "error al obtener la tarea",
      error: err.message,
    });
  }
}

export async function editarTarea(req, res) {
  try {
    const Id = req.params.id;
    if (isNaN(Id)) {
      return res
        .status(400)
        .json({ message: "La id ingresada debe ser un numero valido" });
    }
    const tarea = await TasksModel.findOne({ where: { id: Id } });
    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    const { title, description, isComplete } = req.body;
    if (
      typeof title !== "string" ||
      title.trim() === "" ||
      title.length > 100
    ) {
      return res.status(400).json({
        message:
          "El nuevo titulo debe ser una cadena de texto de no mas de 100 caracteres ",
      });
    }
    const tituloNormalizado = title.trim();
    const tareaExistente = await TasksModel.findOne({
      where: { title: tituloNormalizado, id: { [Op.ne]: Id } },
    });
    if (tareaExistente) {
      return res.status(400).json({
        ok: false,
        message: "Ya exite una tarea registrada con ese titulo",
      });
    }
    if (
      typeof description !== "string" ||
      description.trim() === "" ||
      description.length > 100
    ) {
      return res.status(400).json({
        message:
          "La nueva descripcion debe ser una cadena de texto de no mas de 100 caracteres ",
      });
    }
    if (typeof isComplete !== "boolean") {
      return res.status(400).json({
        message: "isComplete debe ser un valor booleano",
      });
    }
    const tareaActualizada = await TasksModel.update(
      {
        title: tituloNormalizado,
        description,
        isComplete,
      },
      { where: { id: Id } },
    );
    return res
      .status(200)
      .json({ ok: true, status: 200, body: tareaActualizada });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "error al querer editar la tarea",
      error: err.message,
    });
  }
}

export async function borrarTarea(req, res) {
  try {
    const Id = req.params.id;
    if (!Number.isInteger(Id) || Id <= 0) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "La id ingresada debe ser un número entero positivo",
      });
    }
    const tarea = await TasksModel.findOne({ where: { id: Id } });
    if (!tarea) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "tarea no encontrada",
      });
    }
    await TasksModel.destroy({ where: { id: Id } });
    res.status(200).json({
      ok: true,
      status: 200,
      message: "tarea eliminada satisfactoriamente",
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "error al querer eliminar la tarea",
      error: err.message,
    });
  }
}

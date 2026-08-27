import { TasksModel } from "../models/tasks.models";

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
    return res
      .status(500)
      .json({
        ok: false,
        message: "error al obtener la tarea",
        error: err.message,
      });
  }
}

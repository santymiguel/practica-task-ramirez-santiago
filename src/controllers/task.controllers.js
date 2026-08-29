import { TasksModel } from "../models/tasks.models.js";

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

export async function crearTarea(req, res) {
  try {
    const { title, description, isComplete } = req.body;
    if (
      typeof title !== "string" ||
      title.trim() === "" ||
      title.length > 100
    ) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message:
          "el titulo debe ser una texto no vacio de maximo 100 caracteres",
      });
    }
    const titleNormalizado = title.trim();
    const tareaExistente = await TasksModel.findOne({
      where: { title: titleNormalizado },
    });

    if (tareaExistente) {
      return res
        .status(400)
        .json({ message: "Ya existe un registro de tarea con ese titulo" });
    }
    if (
      typeof description !== "string" ||
      description.trim() === "" ||
      description.length > 100
    ) {
      return res.status(400).json({
        message:
          "la descripcion debe ser un texto no vacio y de un maximo de 100 caracteres",
      });
    }
    if (typeof isComplete !== "boolean") {
      return res.status(400).json({
        message: "isComplete debe ser un valor booleano",
      });
    }
    const nuevaTarea = await TasksModel.create({
      title: titleNormalizado,
      description,
      isComplete,
    });
    return res.status(201).json({ ok: true, status: 201, body: nuevaTarea });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Ocurrio un error al intentar crear la tarea",
      error: err.message,
    });
  }
}

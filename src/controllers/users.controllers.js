import { UsersModel } from "../models/users.models";
import { Op, where } from "sequelize";

export async function obtenerUsuarios(req, res) {
  try {
    const usuarios = await UsersModel.findAll();
    res.status(200).json({ ok: true, status: 200, body: usuarios });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al obtener los usuarios",
      error: err.message,
    });
  }
}

export async function obtenerUsuario(req, res) {
  try {
    const Id = req.params.id;
    if (isNaN(Id)) {
      return res
        .status(400)
        .json({ message: "La id ingresada debe ser un numero valido" });
    }
    const usuario = await UsersModel.findOne({ where: { id: Id } });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrada" });
    }
    res.status(200).json({ ok: true, status: 200, body: usuario });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "error al obtener el usuario",
      error: err.message,
    });
  }
}

export async function editarUsuario(req, res) {
  try {
    const Id = req.params.id;
    if (isNaN(Id)) {
      return res
        .status(400)
        .json({ message: "La id ingresada debe ser un numero valido" });
    }
    const usuario = await TasksModel.findOne({ where: { id: Id } });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const { name, email, password } = req.body;
    if (typeof name !== "string" || name.trim() === "" || name.length > 100) {
      return res.status(400).json({
        message:
          "El nombre debe ser una cadena de texto de no mas de 100 caracteres ",
      });
    }
    if (
      typeof email !== "string" ||
      email.trim() === "" ||
      email.length > 100
    ) {
      return res.status(400).json({
        message:
          "El email debe ser una cadena de texto de no mas de 100 caracteres ",
      });
    }
    const emailExistente = await UsersModel.findOne({
      where: { email },
      id: { [Op.ne]: Id },
    });
    if (emailExistente) {
      return res.status(400).json({
        message: "ya existe un usuario con ese email",
      });
    }
    if (
      typeof password !== "string" ||
      password.trim() === "" ||
      password.length > 100
    ) {
      return res.status(400).json({
        message:
          "El password debe ser una cadena de texto de no mas de 100 caracteres ",
      });
    }

    const usuarioActualizado = await UsersModel.update(
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

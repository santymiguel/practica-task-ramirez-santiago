import { TasksModel } from "../models/tasks.models.js";
import { UsersModel } from "../models/users.models.js";
import { Op, where } from "sequelize";

export async function obtenerUsuarios(req, res) {
  try {
    const usuarios = await UsersModel.findAll({ include: TasksModel });
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
    const id = req.params.id;
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ message: "La id ingresada debe ser un numero valido" });
    }
    const usuario = await UsersModel.findByPk(id, { include: TasksModel });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
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

export async function crearUsuario(req, res) {
  try {
    const { name, email, password } = req.body;
    if (typeof name !== "string" || name.trim() === "" || name.length > 100) {
      return res.status(400).json({
        message:
          "El name debe ser una cadena de texto no vacia de no mas de 100 caracteres ",
      });
    }

    if (
      typeof email !== "string" ||
      email.trim() === "" ||
      email.length > 100
    ) {
      return res.status(400).json({
        message:
          "El email debe ser una cadena de texto no vacia de no mas de 100 caracteres ",
      });
    }
    const emailNormalizado = email.trim();
    const emailExistente = await UsersModel.findOne({
      where: { email: emailNormalizado },
    });
    if (emailExistente) {
      return res.status(400).json({
        ok: false,
        message: "Ya existe un usuario registrado con ese email",
      });
    }

    if (
      typeof password !== "string" ||
      password.trim() === "" ||
      password.length > 100
    ) {
      return res.status(400).json({
        message:
          "El password debe ser una cadena de texto no vacia de no mas de 100 caracteres ",
      });
    }

    const usuarioNuevo = await UsersModel.create({
      name: name.trim(),
      email: emailNormalizado,
      password,
    });
    return res.status(201).json({ ok: true, status: 201, body: usuarioNuevo });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "error al querer crear el usuario",
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
    const usuario = await UsersModel.findOne({ where: { id: Id } });
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
    const emailNormalizado = email.trim();
    const emailExistente = await UsersModel.findOne({
      where: { email: emailNormalizado, id: { [Op.ne]: Id } },
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
        name,
        email: emailNormalizado,
        password,
      },
      { where: { id: Id } },
    );
    return res
      .status(200)
      .json({ ok: true, status: 200, body: usuarioActualizado });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "error al querer editar el usuario",
      error: err.message,
    });
  }
}

export async function borrarUsuario(req, res) {
  try {
    const Id = Number(req.params.id);
    if (!Number.isInteger(Id) || Id <= 0) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "La id ingresada debe ser un número entero positivo",
      });
    }
    const usuario = await UsersModel.findOne({ where: { id: Id } });
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Usuario no encontrado",
      });
    }
    await UsersModel.destroy({ where: { id: Id } });
    return res.status(200).json({
      ok: true,
      status: 200,
      message: "Usuario eliminado satisfactoriamente",
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al querer eliminar el usuario",
      error: err.message,
    });
  }
}

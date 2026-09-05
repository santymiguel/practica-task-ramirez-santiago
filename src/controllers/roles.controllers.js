import { UsersModel } from "../models/users.models.js";
import { RolesModel } from "../models/roles.model.js";

export async function crearRoles(req, res) {
  try {
    const { name } = req.body;
    if (!name || typeof name !== "string") {
      return res.status(400).json({
        message:
          "el name del rol es obligatorio y debe ser una cadena de caracteres",
      });
    }
    const nameNormalizado = name.trim();
    const rolExistente = await RolesModel.findOne({
      where: { name: nameNormalizado },
    });
    if (rolExistente) {
      return res.status(400).json({ message: "ya existe un rol con ese name" });
    }
    const role = await RolesModel.create({ name: nameNormalizado });
    return res
      .status(201)
      .json({ message: "rol creado con exito", body: role });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "error al querer crear el rol",
      error: err.message,
    });
  }
}

export async function obtenerRoles(req, res) {
  try {
    const roles = await RolesModel.findAll({
      include: [
        {
          model: UsersModel,
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return res.status(200).json({ ok: true, status: 200, body: roles });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "error al querer cargar los roles",
      error: err.message,
    });
  }
}

export async function crearRoleUser(req, res) {
  try {
    const { user_id, role_id } = req.params;
    const user = await UsersModel.findByPk(user_id);
    if (!user) {
      return res.status(404).json({
        message: "no se encontro un usuario que coincida con la id enviada",
      });
    }
    const role = await RolesModel.findByPk(role_id);
    if (!role) {
      return res.status(404).json({
        message: "no se encontro un rol que coincida con la id enviada",
      });
    }
    const rolesDeUsuario = await user.getRoles();
    const yaTieneRol = rolesDeUsuario.some((rol) => rol.id === role.id);
    if (yaTieneRol) {
      return res
        .status(400)
        .json({ message: "El usuario ya tiene asignado ese rol" });
    }
    await user.addRole(role);
    return res
      .status(201)
      .json({ message: "relacion user-role creada exitosamente" });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al querer crear la relación user-role",
      error: err.message,
    });
  }
}

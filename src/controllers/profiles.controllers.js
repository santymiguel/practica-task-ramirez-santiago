import { UsersModel } from "../models/users.models.js";
import { ProfilesModel } from "../models/profiles.model.js";

export async function crearPerfil(req, res) {
  try {
    const { phone, address, user_id } = req.body;
    if (!phone || !address || !user_id) {
      return res.status(400).json({
        message: "phone,address,user_id son obligatorios",
      });
    }
    const user = await UsersModel.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "el usuario no existe" });
    }
    const perfil = await ProfilesModel.create({
      phone,
      address,
      user_id,
    });
    return res.status(201).json({
      ok: true,
      status: 201,
      body: perfil,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error al crear el perfil", error: err.message });
  }
}

export async function obtenerPerfiles(req, res) {
  try {
    const perfiles = await ProfilesModel.findAll({
      attributes: ["id", "phone", "address"],
      include: [
        {
          model: UsersModel,
          attributes: ["id", "name"],
        },
      ],
    });

    return res.status(200).json({ body: perfiles });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Error al obtener los perfiles",
      error: err.message,
    });
  }
}

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("tasks_users_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export async function testConexion() {
  try {
    await sequelize.authenticate();
    console.log("Conexion exitosa a la base de datos");
  } catch (err) {
    console.log(
      "A ocurrido un error al intentar conectar a la base de datos",
      err,
    );
  }
}

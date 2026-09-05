import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
);

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

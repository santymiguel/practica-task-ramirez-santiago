import express from "express";
import { testConexion } from "./src/config/database.js";
import "dotenv/config";
import { UsersModel } from "./src/models/users.models.js";
import { TasksModel } from "./src/models/tasks.models.js";

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  await testConexion();
  await UsersModel.sync();
  await TasksModel.sync();
  console.log(`El servidor esta corriendo en el puerto ${port}...`);
});

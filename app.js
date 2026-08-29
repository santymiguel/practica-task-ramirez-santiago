import express from "express";
import { testConexion } from "./src/config/database.js";
import { UsersModel } from "./src/models/users.models.js";
import { TasksModel } from "./src/models/tasks.models.js";
import { taskRouter } from "./src/routes/tasks.router.js";
import { userRoutes } from "./src/routes/users.router.js";

const app = express();

app.use(express.json());
app.use("/api/task", taskRouter);
app.use("api/users", userRoutes);

const port = 3000;
app.listen(port, async () => {
  await testConexion();
  await UsersModel.sync();
  await TasksModel.sync();
  console.log(`El servidor esta corriendo en el puerto ${port}...`);
});

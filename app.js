import express from "express";
import "dotenv/config";
import "./src/relations/relations.js";
import { sequelize, testConexion } from "./src/config/database.js";
import { UsersModel } from "./src/models/users.models.js";
import { TasksModel } from "./src/models/tasks.models.js";
import { taskRouter } from "./src/routes/tasks.router.js";
import { userRoutes } from "./src/routes/users.router.js";
import { profilesRouter } from "./src/routes/profiles.router.js";
import { ProfilesModel } from "./src/models/profiles.model.js";
import { rolesRouter } from "./src/routes/roles.router.js";

const app = express();

app.use(express.json());
app.use("/api/tasks", taskRouter);
app.use("/api/users", userRoutes);
app.use("/api/profiles", profilesRouter);
app.use("/api/roles", rolesRouter);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  await testConexion();
  await sequelize.sync();
  console.log(`El servidor esta corriendo en el puerto ${port}...`);
});

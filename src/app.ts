import express, { Request, Response } from "express";
import authRoutes from "./routes/auth/controllers/auth.controller.js";
import userRoutes from "./routes/users/main.js";
import taskRoutes from "./routes/tasks/main.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { options } from "./config/swagger-options.js";
import connectToDb from "./config/db.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", taskRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.use((err: any, req: Request, res: Response) => {
  console.log(err);
  res.status(500).json({
    message: "Some error occurred",
  });
});

connectToDb().then(() => app.listen(PORT));

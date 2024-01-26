import express from "express";
import authRoutes from "./routes/auth/controllers/auth.controller.js";
import userRoutes from "./routes/users/controllers/user.controller.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { options } from "./config/swagger-options.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT);

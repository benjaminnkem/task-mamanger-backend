import express from "express";
import authRoutes from "./routes/auth/controllers/auth.controller.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.listen(PORT);

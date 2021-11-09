import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import pkg from "../package.json";

import userRoutes from './routes/usuarios.routes'
import authRoutes from './routes/auth.routes'
import { createRoles} from "./libs/initialSetup";

const app = express();
createRoles();
// Settings
app.set("pkg", pkg);
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Welcome Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my Products API",
    name: app.get("pkg").name,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
    author: app.get("pkg").author,
  });
});

// Routes
app.use("/api/usuarios", userRoutes);
app.use("/api/auth", authRoutes);

export default app;

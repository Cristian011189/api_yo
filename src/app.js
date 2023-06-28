import express from "express";
import morgan from "morgan";
import usersRoutes from "./routes/users.routes";
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", usersRoutes);

export default app;

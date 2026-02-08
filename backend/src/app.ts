import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

// health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;

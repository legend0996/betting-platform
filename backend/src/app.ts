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

// root welcome route
app.get("/", (req, res) => {
  res.send("Betting Platform API is running!");
});

// example API endpoint
app.get("/api/example", (req, res) => {
  res.json({ message: "This is an example API endpoint." });
});

export default app;

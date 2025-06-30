// src/app.ts
import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import authRoutes from "./routes/auth.routes";
import eventRoutes from "./routes/event.routes";


dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", eventRoutes);
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to the Event Management API",
    status: "success",


  });
});




export default app;

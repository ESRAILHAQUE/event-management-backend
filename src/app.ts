// src/app.ts
import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import authRoutes from "./routes/auth.routes";
import eventRoutes from "./routes/event.routes";


dotenv.config();

const app = express();

// Middlewares
app.use(
  cors({
  origin: ['http://localhost:5173', 'https://your-frontend.vercel.app'],
 // allow your frontend dev origin
    credentials: true, // if you're using cookies or sessions
  })
);

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

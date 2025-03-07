import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import {connectDb} from "./lib/db.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;


app.use("/api/v1/auth", authRoutes);

app.listen( PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  connectDb();
});
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import threadsRoutes from "./routes/threads-routes.js"
import authRoutes from "./routes/auth-routes.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({extended:true,limit:'10mb'}));
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/threads",threadsRoutes)


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to connect to database:", error);
  process.exit(1);
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import foodRoutes from "./routes/food.route.js";
import orderRoutes from "./routes/order.route.js";
import cartRoutes from "./routes/cart.route.js";
dotenv.config();
connectDB();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // FE của bạn
    credentials: true, // BẮT BUỘC
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

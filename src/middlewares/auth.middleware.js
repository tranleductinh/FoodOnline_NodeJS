import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { error } from "../utils/response.js";
import dotenv from "dotenv";
dotenv.config();

export const protect = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return error(res, "UNAUTHORIZED", "You are not authorized", 401);
    }
    const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(decode.id).select("-password");
    if (!user) {
      return error(res, "UNAUTHORIZED", "User not found", 401);
    }
    req.user = user;
    next();
  } catch (err) {
    return error(res, null, "Token is not valid", 401)
  }
};

export const authorize =
  (...roles) =>
  (req, res, next) => {
    console.log("role",roles)
    if (!roles.includes(req.user.role)) {
      return error(res, "PERMISSION_DENIED", "Access denied", 401);
    }
    next();
  };

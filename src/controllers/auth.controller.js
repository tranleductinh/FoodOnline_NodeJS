import { success, error } from "../utils/response.js";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
import { googleLogin, logOutUser, refreshTokenProcess, signUp, singIn } from "../services/auth.service.js";

dotenv.config();

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const signUpController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((e) => ({
        field: e.param,
        message: e.msg,
      }));
      return error(res, "VALIDATION_ERROR", formattedErrors[0].message, null);
    }
    const { email, password } = req.body;
    const user = await signUp({
      email: email.trim(),
      password: password.trim(),
      role: "admin",
    });
    return success(res, user, "User created successfully", 201);
  } catch (err) {
    return error(res, err.errorCode, err.message, err.status);
  }
};

export const signInController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((e) => ({
        field: e.param,
        message: e.msg,
      }));
      return error(res, "VALIDATION_ERROR", formattedErrors[0].message, 400);
    }
    const { email, password } = req.body;
    const user = await singIn({
      email: email.trim(),
      password: password.trim(),
    });
    res.cookie("refreshToken", user.refreshToken, COOKIE_OPTIONS);
    return success(
      res,
      { accessToken: user.accessToken },
      "User logged in successfully",
      200
    );
  } catch (err) {
    console.log(err);
    return error(res, err.errorCode, err.message, err.status);
  }
};

export const refreshTokenController = async (req, res) => {
  try {
    const refreshTokenFromCookie = req.cookies.refreshToken;
    const token = await refreshTokenProcess(refreshTokenFromCookie);
    return success(res, token, "User logged in successfully", 200);
  } catch (err) {
    return error(res, err.errorCode, err.message, err.status);
  }
};

export const getProfileController = async (req, res) => {
  try {
    const user = req.user;
    return success(res, user, "User logged in successfully", 200);
  } catch (err) {
    return error(res, err.errorCode, err.message, err.status);
  }
};

export const googleLoginController = async (req, res) => {
  try {
    const { idToken } = req.body;
    console.log("idToken",idToken)
    const user = await googleLogin(idToken);
    const { refreshToken, ...safeUser } = user;
    res.cookie("refreshToken", user.refreshToken, COOKIE_OPTIONS);

    return success(res, safeUser, "User logged in successfully", 200);
  } catch (err) {
    return error(res, err.errorCode, err.message, err.status);
  }
};


export const logOutController = async (req, res) => {
  try {
    await logOutUser(req.user._id);
    res.clearCookie("refreshToken");
    return success(res, null, "User logged out successfully", 200);
  } catch (err) {
    return error(res, err.errorCode, err.message, err.status);
  }
};

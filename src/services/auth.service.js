import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import dotevn from "dotenv";
import admin from "../config/firebase.js";
dotevn.config();


export const singIn = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const errors = new Error();
      errors.message = "User not found";
      errors.errorCode = "USER_NOT_FOUND";
      throw errors;
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      const errors = new Error();
      errors.message = "Password is not correct";
      errors.errorCode = "PASSWORD_INCORRECT";
      throw errors;
    }
    const token = generateToken(user._id);
    await User.findByIdAndUpdate(user._id, {
      refreshToken: token.refreshToken,
    });
    return {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    };
  } catch (error) {
    throw error;
  }
};
export const signUp = async ({ email, password, role }) => {
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      const errors = new Error();
      errors.message = "Email already exist";
      errors.errorCode = "EMAIL_ALREADY_EXIST";
      throw errors;
    }
    const user = await User.create({ email, password, role });
    const token = generateToken(user._id);
    return {
      user: {
        id: user._id,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
      accessToken: token.accessToken,
    };
  } catch (error) {
    throw error;
  }
};

export const refreshTokenProcess = async (refreshTokenFromCookie) => {
  try {
    if (!refreshTokenFromCookie) {
      throw new Error("Refresh token not found");
    }
    let decoded;
    try {
      decoded = jwt.verify(
        refreshTokenFromCookie,
        process.env.JWT_REFRESH_SECRET
      );
    } catch (error) {
      throw new Error("Refresh token is not valid");
    }
    const user = await User.findById(decoded.id).select("+refreshToken");
    if (!user || user.refreshToken !== refreshTokenFromCookie) {
      throw new Error("Refresh token is not valid");
    }
    const token = generateToken(user._id);
    return {
      accessToken: token.accessToken,
    };
  } catch (error) {
    throw new Error("Refresh token not exist: " + error.message);
  }
};

export const logOutUser = async (user_id) => {
  await User.findByIdAndUpdate(user_id, { refreshToken: null });
};

export const googleLogin = async (idToken) => {
  try {
    // Token bắt buộc
    if (!idToken) {
      const errors = new Error();
      errors.message = "Token is required";
      errors.errorCode = "TOKEN_IS_REQUIRED";
      errors.status = 400;
      throw errors;
    }

    // Kiểm tra format JWT (phải có 3 phần)
    const tokenParts = idToken.split(".");
    if (tokenParts.length !== 3) {
      const errors = new Error();
      errors.message =
        "Invalid token format. Firebase ID token must have 3 parts.";
      errors.errorCode = "INVALID_TOKEN_FORMAT";
      errors.status = 400;
      throw errors;
    }

    // Xác thực token Firebase
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    // Tìm user theo email
    let user = await User.findOne({ email });

    if (user) {
      if (!user.googleId) {
        user.googleId = uid;
        user.avatar = picture || user.avatar;
        user.authType = "google";
        await user.save();
      }
    } else {
      const randomPassword = Math.random().toString(36).slice(-8);

      user = await User.create({
        googleId: uid,
        email,
        name,
        avatar: picture,
        authType: "google",
        password: randomPassword,
      });
    }

    const tokens = generateToken(user._id);

    await User.findByIdAndUpdate(user._id, {
      refreshToken: tokens.refreshToken,
    });
    console.log("refreshTokenGoogle", tokens.refreshToken);

    return {
      message: "Đăng nhập thành công",
      refreshToken : tokens.refreshToken,
      accessToken: tokens.accessToken,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("Google login error:", error);

    if (error.code === "auth/argument-error") {
      const errors = new Error();
      errors.message = "Invalid Firebase ID token format";
      errors.errorCode = "INVALID_TOKEN_FORMAT";
      errors.status = 400;
      throw errors;
    }

    if (error.code === "auth/id-token-expired") {
      const errors = new Error();
      errors.message = "Firebase ID token has expired";
      errors.errorCode = "TOKEN_HAS_EXPIRED";
      errors.status = 401;
      throw errors;
    }
    const errors = new Error();
    errors.message = error.message;
    errors.errorCode = "AUTHENTICATION_FAILED";
    errors.status = 401;
    throw errors;

  }
};

import express from "express";
import {
    signInController,
    refreshTokenController,
    signUpController,
    googleLoginController,
    getProfileController,
    logOutController,
} from "../controllers/auth.controller.js";
import { signUpValidator, signInValidator } from "../validators/auth.validator.js";
import { protect } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.post("/sign-up", signUpValidator, signUpController);
router.post("/sign-in", signInValidator, signInController);
router.post("/google-login", googleLoginController);
router.post("/refresh-token", refreshTokenController);
router.get("/me", protect, getProfileController)
router.post("/log-out", protect, logOutController);
export default router;
import express from "express";
import {
  addFoodController,
  updateFoodController,
  deleteFoodController,
  getAllFoodsController,
  changeAvailableController,
} from "../controllers/food.controller.js";
import {
  createFoodValidator,
  updateFoodValidator,
} from "../validators/food.validator.js";
import { authorize, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post(
  "/",
  protect,
  authorize("admin"),
  createFoodValidator,
  addFoodController
);
router.put("/:id", protect, updateFoodValidator, updateFoodController);
router.put(
  "/change-available/:id",
  protect,
  authorize("admin"),
  updateFoodValidator,
  changeAvailableController
);
router.delete("/:id", protect, authorize("admin"), deleteFoodController);
router.get("/", protect, authorize("admin", "user"), getAllFoodsController);
export default router;

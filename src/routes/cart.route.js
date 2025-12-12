import express from "express";
import {
  addCartController,
  deleteAllCartController,
  deleteCartController,
  getCartController,
  minusCartController,
} from "../controllers/cart.controller.js";
import { authorize, protect } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.post("/", protect,authorize("user"), addCartController);
router.get("/", protect, authorize("user"),getCartController);
router.put("/", protect, authorize("user"),minusCartController);
router.delete("/:_id", protect, authorize("user"),deleteCartController);
router.delete("/", protect, authorize("user"),deleteAllCartController);
export default router;

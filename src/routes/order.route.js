import express from "express";
import {
  addOrderController,
  updateOrderController,
  getAllOrdersController,
  getOrderByIdController,
  changeStatusOrderController,
} from "../controllers/order.controller.js";
import { authorize, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(protect);
router.post("/", protect, authorize("user"), addOrderController);
router.put(
  "/change-status/:id",
  authorize("admin"),
  changeStatusOrderController
);
router.get("/", protect, authorize("admin"), getAllOrdersController);
router.get("/my-orders", protect, authorize("user"), getOrderByIdController);

export default router;

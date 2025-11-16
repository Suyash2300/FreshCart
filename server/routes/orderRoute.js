import express from "express";
import authUser from "../middlewares/authUser.js";
import authorizeRole from "../middlewares/authorizeRole.js";
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
  placeOrderStripe,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/orderController.js";
import authSeller from "../middlewares/authSeller.js";

const orderRouter = express.Router();

orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.post("/stripe", authUser, placeOrderStripe);

orderRouter.get("/user", authUser, getUserOrders);
orderRouter.get("/seller", authUser, authorizeRole(["admin"]), getAllOrders);

orderRouter.put("/:orderId/status", authUser, authorizeRole(["admin"]), updateOrderStatus);
orderRouter.put("/:orderId/cancel", authUser, cancelOrder);

export default orderRouter;

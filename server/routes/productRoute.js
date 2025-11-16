import express from "express";
import { upload } from "../configs/multer.js";
import authUser from "../middlewares/authUser.js";
import authorizeRole from "../middlewares/authorizeRole.js";
import {
  addProduct,
  changeStock,
  productById,
  productList,
  submitRating,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  upload.array(["images"]),
  authUser,
  authorizeRole(["admin"]),
  addProduct
);
productRouter.get("/list", productList);
productRouter.get("/id", productById);
productRouter.post("/stock", authUser, authorizeRole(["admin"]), changeStock);

// ⭐ Add rating route here
productRouter.post("/rate", submitRating);

export default productRouter;

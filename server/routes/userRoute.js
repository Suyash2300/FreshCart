import express from "express";
import {
  isAuth,
  login,
  logout,
  register,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js"; // ✅ Added .js
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/is-auth", authUser, isAuth);
userRouter.get("/logout", authUser, logout);

// New forgot/reset routes
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);

export default userRouter;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    cartItems: { type: Object, default: {} },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    minimize: false,
  }
);

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;

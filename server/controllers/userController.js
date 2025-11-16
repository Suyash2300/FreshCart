import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
//Register user : /api/user/register

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.json({ success: false, message: "Missing details" });

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true, // prevent js to access cookie
      secure: process.env.NODE_ENV === "production", // use secure cookie in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //csrf protection
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiration time
    });
    return res.json({
      success: true,
      user: { email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    console.log(error.message);

    res.json({ success: false, message: error.message });
  }
};

//Login User : /api/user/login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.json({
        success: false,
        message: "Email and Password are required",
      });
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.json({ success: false, message: "Invalid email or password" });

    // Optionally bootstrap admin by email (if matches env)
    // Removed: admin bootstrap via env. Use DB/seed/migration for admin setup.

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true, // prevent js to access cookie
      secure: process.env.NODE_ENV === "production", // use secure cookie in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //csrf protection
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiration time
    });
    return res.json({
      success: true,
      user: { email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error.message);
  }
};

// Check auth : /api/user/is-auth
export const isAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//logout user: /api/user/logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Logged out" });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error.message);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    // Create token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save();

    // Send email
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Nodemailer (Gmail) - original setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset",
      html: `
        <p>You requested a password reset.</p>
        <p>Click <a href="${resetURL}">here</a> to reset your password.</p>
        <p>This link will expire in 10 minutes.</p>
      `,
    });

    res.json({ success: true, message: "Reset link sent to email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.json({ success: false, message: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

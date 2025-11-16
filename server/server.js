import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinar from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRote.js";
import addressRouter from "./routes/adressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { stripeWebhooks } from "./controllers/orderController.js";
import contactRouter from "./routes/contactRoute.js"; // ✅ proper name
import { submitRating } from "./controllers/productController.js";


const app = express();
const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinar();

//Allow multiple origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://fresh-cart-snowy.vercel.app",
];

// Disable ETag to avoid 304 on auth-dependent endpoints
app.set("etag", false);

app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

//Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Prevent caching for API responses (auth-sensitive)
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    res.set("Cache-Control", "no-store");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
  }
  next();
});

app.get("/", (req, res) => res.send("Api is working"));
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);
app.use("/api/contact", contactRouter);
productRouter.post("/rate", submitRating);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

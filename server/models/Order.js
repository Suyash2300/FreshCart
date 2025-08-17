import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "seller", // assuming you have a seller model
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    amount: { type: Number, required: true },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
      required: true,
    },

    // Track status
    status: {
      type: String,
      enum: ["Order Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Order Placed",
    },

    // Who cancelled (user/seller/system)
    cancelledBy: {
      type: String,
      enum: ["User", "Seller", "System", null],
      default: null,
    },

    paymentType: { type: String, required: true },
    isPaid: { type: Boolean, required: true, default: false },

    // Optional: maintain history of status changes
    statusHistory: [
      {
        status: String,
        updatedAt: { type: Date, default: Date.now },
        updatedBy: { type: String, enum: ["User", "Seller", "System"] },
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.models.order || mongoose.model("order", orderSchema);

export default Order;

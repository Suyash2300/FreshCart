import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Dadabase connected")
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/freshcart`);
  } catch (error) {
    console.error(error.message);
  }
};

export default connectDB;

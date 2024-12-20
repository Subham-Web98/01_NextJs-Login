import mongoose from "mongoose";

export async function connectDb() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connection established Successfully");
    });
    connection.on("error", (err) => {
      console.log("MongoDB connection error ", err);
      process.exit();
    });
  } catch (error) {
    console.log("Error connecting");
    console.log(error);
  }
}

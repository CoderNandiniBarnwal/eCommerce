import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "eUser",
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
export default mongoose.model("eProduct", productSchema);

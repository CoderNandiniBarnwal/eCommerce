import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["buyer", "seller"],
      default: "buyer",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isLogin: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: null,
    },
    picture: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
export default mongoose.model("eUser", userSchema);

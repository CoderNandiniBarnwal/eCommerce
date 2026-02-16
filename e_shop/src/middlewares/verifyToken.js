import jwt from "jsonwebtoken";
import userSchema from "../models/userSchema.js";

export const verifyToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(400).json({
        success: false,
        message: "Token expired or invalid",
      });
    } else {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.secretKey, async (err, decoded) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            return res.status(400).json({
              success: false,
              message: "Token expired",
            });
          }
          return res.status(400).json({
            success: false,
            message: "Token invalid",
          });
        } else {
          const { id } = decoded;
          console.log(id);
          const user = await userSchema.findById(id);

          if (!user) {
            return res.status(400).json({
              success: false,
              message: "User not found",
            });
          }

          user.isVerified = true;
          user.token = null;
          await user.save();

          return res.status(200).json({
            success: true,
            message: "Token verified successfully",
          });
        }
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

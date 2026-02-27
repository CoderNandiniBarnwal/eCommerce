//hasToken.js

import jwt from "jsonwebtoken";
import userSchema from "../models/userSchema.js";
import sessionSchema from "../models/sessionSchema.js";

export const hasToken = async (req, res, next) => {
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
          const user = await userSchema.findById(id);

          if (!user) {
            return res.status(404).json({
              success: false,
              message: "User not found",
            });
          }

          const existing = await sessionSchema.findOne({ userId: id });
          if (!existing) {
            return res.status(200).json({
              success: true,
              message: "User logged out already",
            });
          }
          req.userId = id;
          req.user = user;
          next();
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

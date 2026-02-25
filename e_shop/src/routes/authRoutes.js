//authRoute.js

import {
  login,
  logout,
  register,
  updateUser,
} from "../controller/authController.js";
import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { hasToken } from "../middlewares/hasToken.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import {
  userValidate,
  userValidationSchema,
} from "../validators/authValidation.js";

const authRoute = express.Router();
// authRoute.post(
//   "/register",
//   userValidate(userValidationSchema),
//   upload.single("picture"),
//   register,
// );
authRoute.post(
  "/register",
  upload.single("picture"),
  userValidate(userValidationSchema),
  register,
);

authRoute.get("/verify", verifyToken);
authRoute.post("/login", login);
authRoute.delete("/logout", hasToken, logout);
authRoute.put("/update/:id",upload.single("picture"),userValidate(userValidationSchema), updateUser);

export default authRoute;

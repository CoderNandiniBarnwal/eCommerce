import express from "express";
import {
  addCart,
  deleteCart,
  getCart,
  updateCart,
} from "../controller/cartController.js";
import { buyerRoleMiddleware } from "../middlewares/buyerRoleMiddleware.js";
import { hasToken } from "../middlewares/hasToken.js";

const cartRoute = express.Router();
cartRoute.post("/addCart/:productId", hasToken, buyerRoleMiddleware, addCart);

cartRoute.get("/getAllCart", hasToken, buyerRoleMiddleware, getCart);

cartRoute.delete(
  "/deleteCart/:productId",
  hasToken,
  buyerRoleMiddleware,
  deleteCart,
);
cartRoute.put(
  "/updateCart/:productId",
  hasToken,
  buyerRoleMiddleware,
  updateCart,
);

export default cartRoute;

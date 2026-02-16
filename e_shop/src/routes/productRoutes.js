import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "../controller/productController.js";
import { sellerRoleMiddleware } from "../middlewares/sellerRoleMiddleware.js";
import { hasToken } from "../middlewares/hasToken.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const productRoute = express.Router();
productRoute.post(
  "/addProduct",
  hasToken,
  sellerRoleMiddleware,
  upload.single("picture"),
  addProduct,
);

productRoute.get("/getProductById/:id", getProductById);
productRoute.get("/getAllProduct", getAllProduct);
productRoute.delete(
  "/deleteProduct/:id",
  hasToken,
  sellerRoleMiddleware,
  deleteProduct,
);
productRoute.put(
  "/updateProduct/:id",
  hasToken,
  sellerRoleMiddleware,
  updateProduct,
);

export default productRoute;

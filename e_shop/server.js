//server.js

import express from "express";
import dotenv from "dotenv/config";
import { dbConnect } from "./src/config/dbConnect.js";
import authRoute from "./src/routes/authRoutes.js";
import productRoute from "./src/routes/productRoutes.js";
import cartRoute from "./src/routes/cartRoutes.js";
import cors from "cors";

const port = process.env.port;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", authRoute);
app.use("/upload", express.static("upload"));
app.use("/product", productRoute);
app.use("/cart", cartRoute);

dbConnect();

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

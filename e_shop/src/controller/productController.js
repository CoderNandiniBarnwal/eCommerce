//productController.js

import productSchema from "../models/productSchema.js";

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const userId = req.params.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "can't find image",
      });
    }
    const allowTypes = ["image/jpeg", "image/png", "image/svg+xml"];
    if (!allowTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid extension",
      });
    }

    console.log("FILE:", req.file);

    // const imgUrl = `http://localhost:8001/product/${req.file.filename}`;
    const imgUrl = `http://localhost:8001/upload/${req.file.filename}`;

    const user = await productSchema.create({
      name,
      description,
      price,
      stock,
      userId,
      picture: imgUrl,
      seller: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const user = await productSchema.findById(
      // seller: req.params.id,
      req.params.id,
    );
    console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const user = await productSchema.find({});

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await productSchema.findByIdAndDelete({
      userId: req.userId,
      _id: id,
    });

    if (user) {
      return res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: user,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const checkProduct = await productSchema.findById(id);
    console.log("Actual seller of product:", checkProduct?.seller);
    console.log("Logged in seller:", req.userId);
    console.log("PARAM ID:", id);
    console.log("REQ USER ID:", req.userId);
    let imgUrl = "";

    if (req.file) {
      const allowTypes = ["image/jpeg", "image/png", "image/svg+xml"];
      if (!allowTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
          success: false,
          message: "Invalid extension",
        });
      }

      console.log("FILE:", req.file);

      imgUrl = `http://localhost:8001/upload/${req.file.filename}`;
    }

    const user = await productSchema.findOne({
      seller: req.userId,
      _id: id,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    user.name = name;
    user.description = description;
    user.price = price;
    user.stock = stock;
    if (imgUrl) user.picture = imgUrl;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const paginateProduct = async (req, res) => {
  try {
    // const page = Number(req.query.page) || 1;
    // const limit = Number(req.query.limit) || 4;

    let {
      page = 1,
      limit = 8,
      sort = "",
      search = "",
      category = "",
    } = req.query;
    page = Number(page) || 1;
    limit = Number(limit) || 8;

    const skip = (page - 1) * limit;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    let sortOption = {};
    if (sort === "low") sortOption.price = 1;
    if (sort === "high") sortOption.price = -1;

    const totalProduct = await productSchema.countDocuments(query);
    console.log(query);
    console.log(totalProduct);

    const user = await productSchema
      .find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalProduct / limit);

    return res.status(200).json({
      success: true,
      message: "Product selected as per query",
      data: user,
      totalPages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

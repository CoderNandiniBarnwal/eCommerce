import cartSchema from "../models/cartSchema.js";
import productSchema from "../models/productSchema.js";

export const addCart = async (req, res) => {
  try {
    let { quantity } = req.body;
    const { productId } = req.params;

    quantity = Number(quantity) || 1;

    const product = await productSchema.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const cart = await cartSchema.findOne({ userId: req.userId });
    if (cart) {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId: productId, quantity: quantity });
      }
      await cart.save();

      return res.status(200).json({
        success: true,
        message: "product added successfully",
        data: cart,
      });
    } else {
      const newCart = await cartSchema.create({
        userId: req.userId,
        items: [
          {
            productId: productId,
            quantity: quantity,
          },
        ],
      });
      return res.status(201).json({
        success: true,
        message: "Cart created & product added successfully",
        data: newCart,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await cartSchema
      .findOne({ userId: req.userId })
      .populate("items.productId");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    const totalAmount = cart.items.reduce(
      (acc, i) => acc + i.quantity * i.productId.price,
      0,
    );
    return res.status(200).json({
      success: true,
      message: "product fetched successfully",
      totalItems: cart.items.length,
      totalAmount,
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await cartSchema.findOne({ userId: req.userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId,
    );

    if (!existingItem) {
      return res.status(404).json({
        success: false,
        message: "product not in cart",
      });
    }
    cart.items = cart.items.filter(
      (itemToDelete) => itemToDelete.productId.toString() !== productId,
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "product removed successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { productId } = req.params;
    let { quantity } = req.body;
    quantity = Number(quantity);

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0",
      });
    }

    const cart = await cartSchema.findOne({ userId: req.userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId,
    );

    if (!existingItem) {
      return res.status(404).json({
        success: false,
        message: "product not in cart",
      });
    }
    existingItem.quantity = quantity;
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "product updated successfully",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//cartController.js

import cartSchema from "../models/cartSchema.js";
import productSchema from "../models/productSchema.js";

export const addCart = async (req, res) => {
  try {
    let { quantity } = req.body;
    const { productId } = req.params;

    quantity = Number(quantity);
    if (!quantity || quantity < 1) {
      quantity = 1;
    }

    const product = await productSchema.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await cartSchema.findOne({ userId: req.userId });
    if (cart) {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId,
      );

      if (existingItem) {
        const netQuantity = existingItem.quantity + quantity;

        if (netQuantity > product.stock) {
          return res.status(400).json({
            success: false,
            message: `Only ${product.stock} items in a stock, Product out of stock`,
          });
        }
        existingItem.quantity = netQuantity;
      } else {
        if (quantity > product.stock) {
          return res.status(400).json({
            success: false,
            message: `Only ${product.stock} items in a stock, Product out of stock`,
          });
        }

        cart.items.push({
          productId: productId,
          quantity: quantity,
          price: product.price,
        });
      }

      const totalAmount = cart.items.reduce(
        (acc, i) => acc + i.quantity * i.price,
        0,
      );
      cart.totalAmount = totalAmount;
      await cart.save();
      await cart.populate(
        "items.productId",
        "name description stock picture price",
      );

      return res.status(200).json({
        success: true,
        message: "product added successfully",
        data: cart,
        totalItems: cart.items.length,
        totalAmount: cart.totalAmount,
      });
    } else {
      if (quantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} items in a stock, Product out of stock`,
        });
      }

      let newCart = await cartSchema.create({
        userId: req.userId,
        items: [
          {
            productId: productId,
            quantity: quantity,
            price: product.price,
          },
        ],
      });

      newCart.totalAmount = quantity * product.price;
      await newCart.save();
      await newCart.populate(
        "items.productId",
        "name description price stock picture",
      );

      return res.status(201).json({
        success: true,
        message: "Cart created & product added successfully",
        data: newCart,
        totalAmount: newCart.totalAmount,
        totaItems: newCart.items.length,
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
      .populate("items.productId", "name description stock picture price");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    const totalAmount = cart.items.reduce(
      (acc, i) => acc + i.quantity * i.price,
      0,
    );
    // cart.totalAmount = totalAmount;
    // await cart.save();

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

    const totalAmount = cart.items.reduce(
      (acc, i) => acc + i.quantity * i.price,
      0,
    );

    cart.totalAmount = totalAmount;
    await cart.save();

    await cart.populate(
      "items.productId",
      "name description stock picture price",
    );

    return res.status(200).json({
      success: true,
      message: "product removed successfully",
      data: cart,
      totalAmount,
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

    if (isNaN(quantity)) {
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
    const product = await productSchema.findById(productId);
    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    const netQuantity = existingItem.quantity + quantity;

    if (netQuantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} in a stock`,
      });
    }
    if (netQuantity < 1) {
      return res.status(400).json({
        success: false,
        message: `Minimum 1 product is required in a cart`,
      });
    } else {
      existingItem.quantity = netQuantity;
    }
    const totalAmount = cart.items.reduce(
      (acc, i) => acc + i.quantity * i.price,
      0,
    );
    await cart.save();
    await cart.populate(
      "items.productId",
      "name description price stock picture",
    );

    return res.status(200).json({
      success: true,
      message: "product updated successfully",
      data: cart,
      totalItems: cart.items.length,
      totalAmount: cart.totalAmount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const calculateCartTotal = (req, res, next) => {
  try {
    const { items } = req.body;

    if (!items || items.length < 1) {
      req.body.totalAmount = 0;
      return next();
    }

    const totalAmount = items.reduce((acc, i) => {
      return acc + i.price * i.quantity;
    }, 0);

    req.body.totalAmount = totalAmount;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

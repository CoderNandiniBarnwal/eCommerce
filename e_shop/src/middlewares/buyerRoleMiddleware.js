export const buyerRoleMiddleware = async (req, res, next) => {
  try {
    console.log("USER:", req.user);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorised access",
      });
    }
    if (req.user.role !== "buyer") {
      return res.status(403).json({
        success: false,
        message: "access forbidden",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

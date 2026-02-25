//authController.js

import userSchema from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyMail } from "../emailVerify/verifyMail.js";
import sessionSchema from "../models/sessionSchema.js";

export const register = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;
    const userId = req.params.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image not found",
      });
    }

    const allowTypes = ["image/jpeg", "image/png", "image/svg+xml"];
    if (!allowTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid extension",
      });
    }

    const imgUrl = `http://localhost:8001/upload/${req.file.filename}`;

    const userExists = await userSchema.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userSchema.create({
      userName,
      email,
      password: hashPassword,
      role,
      userId,
      picture: imgUrl,
    });

    const token = jwt.sign({ id: user._id }, process.env.secretKey, {
      expiresIn: "10m",
    });

    user.token = token;
    await user.save();
    verifyMail(token, email);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized error",
      });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    // const passwordCheck = password === user.password;
    if (!passwordCheck) {
      return res.status(400).json({
        success: false,
        message: "password missmatch",
      });
    }

    if (passwordCheck && user.isVerified === true) {
      await sessionSchema.findOneAndDelete({ userId: user._id });
      await sessionSchema.create({ userId: user._id });

      const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.secretKey,
        {
          expiresIn: "30days",
        },
      );
      const refreshToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.secretKey,
        {
          expiresIn: "10days",
        },
      );
      user.isLogin = true;
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Login sucessful",
        data: user,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "First complete verification then login",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const logout = async (req, res) => {
  console.log(req.userId);
  try {
    const existing = await sessionSchema.findOne({ userId: req.userId });
    const user = await userSchema.findById(req.userId);

    if (existing) {
      await sessionSchema.findOneAndDelete({ userId: req.userId });

      user.isLogin = false;
      await user.save();

      return res.status(200).json({
        success: true,
        message: "User Logout",
        data: user,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "User has no session",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// export const updateUser = async (req, res) => {
//   try {
//     const { userName, email, password, role } = req.body;
//     const id = req.params.id;

//     const userExists = await userSchema.findOne({ email, id: !id });
//     if (userExists) {
//       return res.status(400).json({
//         success: false,
//         message: "User already registered",
//       });
//     }

//     const user = await userSchema.findOne({
//       _id: id,
//       userId: req.userId,
//     });

//     const hashPassword = await bcrypt.hash(password, 10);

//     user.userName = userName;
//     user.email = email;
//     user.password = hashPassword;
//     user.role = role;
//     await user.save();

//     if (user) {
//       return res.status(200).json({
//         success: true,
//         message: "User updated successfully",
//         data: user,
//       });
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "User not updated",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const updateUser = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;
    const id = req.params.id;

    const user = await userSchema.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Email update
    if (email) {
      const userExists = await userSchema.findOne({
        email,
        _id: { $ne: id },
      });

      if (userExists) {
        return res.status(400).json({
          success: false,
          message: "User already registered",
        });
      }

      user.email = email;
    }

    if (userName) user.userName = userName;
    if (role) user.role = role;

    // Password update
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // Image update
    if (req.file) {
      const allowTypes = ["image/jpeg", "image/png", "image/svg+xml"];

      if (!allowTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
          success: false,
          message: "Invalid extension",
        });
      }

      user.picture = `http://localhost:8001/upload/${req.file.filename}`;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.id = decode.userId;

    // ✅ Fetch full user and attach to req.user
    const user = await User.findById(decode.userId);
    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }

    req.user = user; // So controllers can access role, email, etc.
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Authentication failed",
      success: false,
    });
  }
};

export default isAuthenticated;

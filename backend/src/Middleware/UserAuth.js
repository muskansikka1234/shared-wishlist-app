import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";

const UserAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorised, login again" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenDecode.id) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const user = await UserModel.findById(tokenDecode.id);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.userId = user._id;
    req.user = user;
    next(); return;

  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default UserAuth;

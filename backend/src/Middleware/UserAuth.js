import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";

const UserAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorised, login again" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.userId = tokenDecode.id;

      // ✅ Fetch full user data
      const user = await UserModel.findById(tokenDecode.id);
      if (!user) {
        return res.status(401).json({ success: false, message: "User not found" });
      }

      req.user = user; // ✅ Attach full user to req
      next();
    } else {
      return res.status(401).json({ success: false, message: "Not authorised, login again" });
    }

  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export default UserAuth;

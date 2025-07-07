import UserModel from "../Models/UserModel.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId; // From UserAuth middleware

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      userData: {
        name: user.name,
        email: user.email, // ✅ Add this line
        isAccountVerified: user.isAccountVerified
      }
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

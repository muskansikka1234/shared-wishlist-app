import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import { connectDB } from "./Config/db.js";
import authRouter from "./Routes/authRoutes.js";
import userRouter from "./Routes/userRoutes.js";
import wishlistRoutes from "./Routes/WishlistRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// ✅ Connect to MongoDB
connectDB();

// ✅ CORS Configuration (for localhost + Render frontend)
const allowedOrigins = [
  'http://localhost:5173',
  'https://shared-wishlist-app-frontend.onrender.com'
];

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like curl, mobile apps)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true // 🔒 allow sending cookies from browser
}));

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("API working ✅");
});

// ✅ API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/wishlists", wishlistRoutes);

// ✅ Start Server
app.listen(port, () =>
  console.log(`🚀 Server started on port ${port}`)
);

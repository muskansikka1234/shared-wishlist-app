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

// Connect to database
connectDB();

// ✅ Allow CORS from local + deployed frontend
const allowedOrigins = [
  'http://localhost:5173',
  'https://shared-wishlist-app-frontend.onrender.com'
];

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Routes
app.get('/', (req, res) => res.send("API working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/wishlists', wishlistRoutes);

// Start server
app.listen(port, () => console.log(`Server started on port : ${port}`));

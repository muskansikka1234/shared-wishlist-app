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

const allowedOrigins = ['http://localhost:5173']

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin : allowedOrigins, credentials: true }));

// Routes
app.get('/', (req, res) => res.send("API working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.use('/api/wishlists', wishlistRoutes);

// Start server
app.listen(port, () => console.log(`Server started on port : ${port}`));

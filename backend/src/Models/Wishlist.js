import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: String,
  price: Number,
  addedBy: String, // email of user
  addedAt: { type: Date, default: Date.now },
});

const wishlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: { type: String, required: true }, // email
  collaborators: [String],
  products: [productSchema], // embedded products
});

const Wishlist = mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;

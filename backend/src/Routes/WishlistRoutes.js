import express from 'express';
import Wishlist from '../Models/Wishlist.js';
import UserAuth from '../Middleware/UserAuth.js';



const router = express.Router();

// ✅ TEST route
router.get("/test", (req, res) => {
  res.send("✅ Wishlist test route is working");
});

// ✅ CREATE a new wishlist
router.post("/", async (req, res) => {
  console.log("🎯 POST /api/wishlists hit");

  try {
    const { name, createdBy, collaborators } = req.body;

    // ✅ Now this will work because name & createdBy are defined above
    const existing = await Wishlist.findOne({ name, createdBy });
    if (existing) {
      return res.status(400).json({ message: "Wishlist with same name already exists" });
    }

    const newWishlist = new Wishlist({
      name,
      createdBy,
      collaborators: [createdBy, ...(collaborators || [])],
      products: [],
    });

    const savedWishlist = await newWishlist.save();
    res.status(201).json(savedWishlist);

  } catch (error) {
    console.error("❌ Error creating wishlist:", error);
    res.status(500).json({ message: "Failed to create wishlist", error });
  }
});


// ✅ GET wishlists for the logged-in user
router.get("/my", UserAuth, async (req, res) => {
  try {
    const userEmail = req.user?.email;

    if (!userEmail) {
      return res.status(401).json({ success: false, message: "User email not found" });
    }

    const wishlists = await Wishlist.find({
      collaborators: userEmail
    }).sort({ createdAt: -1 }); // 🆕 latest first

    res.status(200).json({ success: true, wishlists });

  } catch (error) {
    console.error("❌ Error fetching wishlists:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch wishlists" });
  }
});

// ADD a product to a wishlist
router.post("/:wishlistId/products", UserAuth, async (req, res) => {
  try {
    const { name, imageUrl, price } = req.body;
    const { wishlistId } = req.params;

    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    wishlist.products.push({
      name,
      imageUrl,
      price,
      addedBy: req.user.email,
    });

    await wishlist.save();
    res.status(200).json({ success: true, message: "Product added", wishlist });

  } catch (error) {
    console.error("❌ Error adding product:", error.message);
    res.status(500).json({ message: "Failed to add product" });
  }
});

// DELETE a product
router.delete("/:wishlistId/products/:productId", UserAuth, async (req, res) => {
  try {
    const { wishlistId, productId } = req.params;

    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    wishlist.products = wishlist.products.filter(p => p._id.toString() !== productId);
    await wishlist.save();

    res.status(200).json({ success: true, message: "Product removed" });

  } catch (error) {
    console.error("❌ Error removing product:", error.message);
    res.status(500).json({ message: "Failed to remove product" });
  }
});

// EDIT a product
router.put("/:wishlistId/products/:productId", UserAuth, async (req, res) => {
  try {
    const { wishlistId, productId } = req.params;
    const { name, imageUrl, price } = req.body;

    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    const product = wishlist.products.id(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Update fields
    product.name = name;
    product.imageUrl = imageUrl;
    product.price = price;

    await wishlist.save();
    res.status(200).json({ success: true, message: "Product updated", product });

  } catch (error) {
    console.error("❌ Error updating product:", error.message);
    res.status(500).json({ message: "Failed to update product" });
  }
});

// GET a specific wishlist (for ProductManager view)
router.get("/:wishlistId", UserAuth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.wishlistId);
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });
    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ message: "Failed to get wishlist" });
  }
});

router.delete("/:wishlistId", UserAuth, async (req, res) => {
  try {
    const { wishlistId } = req.params;
    const wishlist = await Wishlist.findById(wishlistId);

    if (!wishlist) {
      return res.status(404).json({ success: false, message: "Wishlist not found" });
    }

    await Wishlist.deleteOne({ _id: wishlistId });
    res.status(200).json({ success: true, message: "Wishlist deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete wishlist" });
  }
});

// 🔗 Mock invite collaborator route
router.put('/:wishlistId/invite', UserAuth, async (req, res) => {
  const { wishlistId } = req.params;
  const { collaboratorEmail } = req.body;
  const inviter = req.user;

  try {
    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

    if (wishlist.collaborators.includes(collaboratorEmail)) {
      return res.status(400).json({ message: 'Already a collaborator' });
    }

    wishlist.collaborators.push(collaboratorEmail);
    await wishlist.save();

    // ✅ MOCK: Simulate email sending (no real email logic)
    console.log(`📧 [MOCK] Email would be sent to: ${collaboratorEmail} by ${inviter.name}`);

    return res.status(200).json({ success: true, message: "Mock invitation sent successfully!" });

  } catch (err) {
    console.error("❌ Error sending invite (mock):", err.message);
    return res.status(500).json({ message: "Mock: Failed to send invite" });
  }
});





export default router;

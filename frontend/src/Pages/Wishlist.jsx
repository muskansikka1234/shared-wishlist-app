import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContent } from '../Context/AppContext';
import axios from 'axios';
import ProductManager from '../Components/ProductManager';
// ✅ InviteCollaborator is not needed anymore, so you can remove the import

const WishlistPage = () => {
  const { id } = useParams();
  const { userData, backendUrl } = useContext(AppContent);
  const [wishlist, setWishlist] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/wishlists/${id}`, {
          withCredentials: true,
        });
        setWishlist(res.data.wishlist);
      } catch (err) {
        console.error('Failed to load wishlist:', err);
      }
    };

    fetchWishlist();
  }, [id]);

  if (!wishlist) return <div className="p-6">Loading wishlist...</div>;

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-2">{wishlist.name}</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">Created by: {wishlist.createdBy}</p>

      {/* ✅ Only show product manager */}
      <ProductManager wishlistId={wishlist._id} userEmail={userData?.email} />
    </div>
  );
};

export default WishlistPage;

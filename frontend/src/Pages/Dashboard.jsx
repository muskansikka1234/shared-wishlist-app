import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../Context/AppContext";
import axios from "axios";

const Dashboard = () => {
  const { userData, backendUrl } = useContext(AppContent);
  const [wishlists, setWishlists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/wishlists/my`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setWishlists(res.data.wishlists);
        }
      } catch (error) {
        console.error("Error fetching wishlists:", error);
      }
    };

    if (userData?.email) {
      fetchWishlists();
    }
  }, [userData]);

  const handleDelete = async (wishlistId) => {
  if (!window.confirm("Are you sure you want to delete this wishlist?")) return;

  try {
    const res = await axios.delete(`${backendUrl}/api/wishlists/${wishlistId}`, {
      withCredentials: true,
    });

    if (res.data.success) {
      setWishlists(prev => prev.filter(w => w._id !== wishlistId));
    } else {
      console.error("Failed to delete wishlist");
    }
  } catch (error) {
    console.error("Error deleting wishlist:", error.message);
  }
};


  return (
    <div className="p-6 text-gray-800 dark:text-white min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6">Welcome, {userData?.name} 👋</h1>

      <button
        onClick={() => navigate("/create-wishlist")}
        className="mb-8 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
      >
        + Create New Wishlist
      </button>

      {wishlists.length === 0 ? (
        <p>No wishlists found. Create one to get started!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishlists.map((wishlist) => (
            <div
              key={wishlist._id}
              className="border dark:border-gray-700 bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
            >
              <h2 className="text-xl font-semibold">{wishlist.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Created by: {wishlist.createdBy}
              </p>
              <p className="mt-2">🛍️ Products: {wishlist.products.length}</p>
              
    <div className="mt-4 flex gap-2">
 <button
  onClick={() => navigate(`/wishlist/${wishlist._id}`)}
  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
>
  View Wishlist
</button>

  <button
    onClick={() => handleDelete(wishlist._id)}
    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
  >
    Delete
  </button>

  <button
  onClick={() => navigate(`/wishlist/${wishlist._id}/invite`)}
  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
>
  Invite
</button>

</div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

import { useContext, useState, useEffect } from "react";
import { AppContent } from "../Context/AppContext"; // context
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateWishlist = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { userData, backendUrl } = useContext(AppContent);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!userData?.email) {
      toast.error("User not loaded yet. Try again in a moment.");
      return;
    }

    try {
      const res = await axios.post(`${backendUrl}/api/wishlists`, {
        name,
        createdBy: userData.email
      });

      toast.success("Wishlist created!");
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Wishlist creation failed:", err);
      toast.error("Failed to create wishlist. " + (err?.response?.data?.message || ""));
    }
  };

  if (!userData) return <div className="text-center mt-10">Loading user...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleCreate}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          Create a Wishlist
        </h2>
        <input
          type="text"
          placeholder="Wishlist name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md mb-4 dark:bg-gray-700 dark:text-white"
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateWishlist;

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const InviteCollaboratorPage = () => {
  const { id } = useParams(); // Wishlist ID
  const [email, setEmail] = useState('');

 const handleInvite = async (e) => {
  e.preventDefault();

  if (!email.trim()) {
    return toast.error("Please enter a valid email");
  }

  // ✅ MOCK behavior – simulate delay and show toast
  try {
    // Optional: simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    toast.success(`✅ Mock invite sent to ${email}`);
    setEmail('');
  } catch (err) {
    console.error("❌ Mock invite error:", err.message);
    toast.error("Something went wrong!");
  }
};




  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">Invite Collaborator</h2>
        <p className="text-center text-sm mb-6">Share your Wishlist with your friends and family!</p>

        <form onSubmit={handleInvite} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email you want to collaborate with"
            className="bg-transparent border border-indigo-500 rounded px-3 py-2 outline-none text-white placeholder-indigo-400"
            required
          />

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
          >
            Invite
          </button>
        </form>
      </div>
    </div>
  );
};

export default InviteCollaboratorPage;

import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContent } from '../Context/AppContext.jsx'
import {useNavigate} from 'react-router-dom'


const Header = () => {

  const {userData} = useContext(AppContent)
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if(userData) {
      navigate('/create-wishlist');
    } else {
      navigate('/login');
    }
  }

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">

      <img src={assets.header_img} alt ="" className="w-36 h-36 rounded-full mb-6"/>

      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
      Hey {userData ? userData.name : 'User'}!  <img className="w-8 aspect-square" src={assets.hand_wave} alt=""/></h1>

      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">Welcome to shared wishlist App</h2>

      <p className="mb-8 max-w-md">Start by creating your first wishlist and invite friends to plan together — it's quick and fun!</p>
      
      <button onClick={handleGetStarted} className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all">Create new Wishlist</button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
  <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg">
    <h3 className="font-semibold">🛍️ Create Wishlists</h3>
    <p className="text-gray-500">Add your favorite products easily</p>
  </div>
  <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg">
    <h3 className="font-semibold">🤝 Invite Friends</h3>
    <p className="text-gray-500">Collaborate in real-time</p>
  </div>
  <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg">
    <h3 className="font-semibold">📦 Track Items</h3>
    <p className="text-gray-500">Keep everything in one place</p>
  </div>
</div>

    </div>
  )
}

export default Header

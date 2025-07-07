import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import EmailVerify from './Pages/EmailVerify.jsx'
import ResetPassword from './Pages/ResetPassword.jsx'

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './Pages/Dashboard.jsx'
import CreateWishlist from './Pages/CreateWishlist.jsx';

import WishlistPage from "./Pages/Wishlist.jsx";
import InviteCollaboratorPage from "./Pages/InviteCollaborator.jsx";


const App = () => {

  

  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/email-verify' element = {<EmailVerify/>}/>
        <Route path='/reset-password' element = {<ResetPassword/>}/>
        <Route path='/dashboard' element = {<Dashboard/>}/>
        <Route path="/create-wishlist" element={<CreateWishlist />} />
        
        <Route path="/wishlist/:id" element={<WishlistPage />} />
        <Route path="/wishlist/:id/invite" element={<InviteCollaboratorPage />} />



      </Routes>
    </div>
  )
}

export default App

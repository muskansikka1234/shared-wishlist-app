# 📝 Shared Wishlist App

A full-stack collaborative wishlist app where users can create wishlists, add products, and invite collaborators to contribute.

---

## 🚀 Live Demo

- 🔗 Frontend: [https://shared-wishlist-app-frontend.onrender.com](https://shared-wishlist-app-frontend.onrender.com)  
- 🔗 Backend: [https://shared-wishlist-app-backend.onrender.com](https://shared-wishlist-app-backend.onrender.com)

---

## 🧑‍💻 Tech Stack

**Frontend:**
- React (Vite)
- React Router DOM
- Axios
- React Toastify
- Tailwind CSS

**Backend:**
- Node.js + Express
- MongoDB (Mongoose)
- JWT (Authentication)
- BcryptJS (Password Hashing)
- Nodemailer + Brevo SMTP (Email Service)

**Deployment:**
- Render (both frontend & backend)

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites

- Node.js + npm installed
- MongoDB URI (Atlas or local)
- Brevo SMTP credentials (for email OTP)

---

### 📦 Backend Setup

```bash
git clone https://github.com/your-username/shared-wishlist-app.git
cd shared-wishlist-app/backend
npm install

### Create .env file in backend/:

PORT=4000
MONGODB_CONNECTION_STRING=your_mongo_uri
JWT_SECRET=your_jwt_secret
SENDER_EMAIL=your_brevo_email
SMTP_USER=your_brevo_user
SMTP_PASS=your_brevo_pass
NODE_ENV=production

### Start server:

node src/Server.js

💻 Frontend Setup

cd ../frontend
npm install

Create .env file in frontend/:

VITE_BACKEND_URL=https://shared-wishlist-app-backend.onrender.com

Start frontend:

npm run dev

🔮 Future Improvements

Real-time sync using Socket.IO

Email-based invite token system

Image uploads via Cloudinary

Role-based access for collaborators

Better mobile responsiveness

Product filtering/search

Refresh tokens & auto-logout on expiry

📽️ Demo Video
🎥 Watch here: Loom Demo

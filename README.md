# 📝 Shared Wishlist App

A full-stack collaborative wishlist management app where users can create product wishlists and invite others to view or manage them.

---

## 🚀 Live Demo

🌐 Frontend: [https://shared-wishlist-app-frontend.onrender.com](https://shared-wishlist-app-frontend.onrender.com)  
🌐 Backend: [https://shared-wishlist-app-backend.onrender.com](https://shared-wishlist-app-backend.onrender.com)

---

## 🧑‍💻 Tech Stack Used

### Frontend:
- **React.js** with Vite
- **React Router** (for routing)
- **React Toastify** (for notifications)
- **Axios** (for API calls)
- **Tailwind CSS** (optional, or standard CSS)

### Backend:
- **Node.js + Express**
- **MongoDB** with **Mongoose**
- **JWT** (for authentication)
- **BcryptJS** (for password hashing)
- **Brevo (Sendinblue)** via **Nodemailer** (for real email invites/OTP)
- **Render** (for deployment)

---

## 🛠️ Setup Instructions

### 🔧 Prerequisites
- Node.js and npm
- MongoDB database (e.g., [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Brevo SMTP account

  📄 Create a .env file inside backend/:
env
Copy
Edit
PORT=4000
MONGODB_CONNECTION_STRING=your_mongodb_connection
JWT_SECRET=your_jwt_secret
SENDER_EMAIL=your_brevo_verified_email
SMTP_USER=your_brevo_smtp_user
SMTP_PASS=your_brevo_smtp_password
NODE_ENV=production
▶️ Run the backend server:
bash
Copy
Edit
node src/Server.js
🌐 Frontend Setup
bash
Copy
Edit
cd frontend
npm install
📄 Create a .env file inside frontend/:
env
Copy
Edit
VITE_BACKEND_URL=https://shared-wishlist-app-backend.onrender.com
▶️ Run the frontend app:
bash
Copy
Edit
npm run dev
📸 Screenshots
(Add screenshots or screen recordings here)

✅ Login Page

✅ Dashboard with user’s wishlists

✅ Create Wishlist and Add Products

✅ Invite Collaborators via Email

✅ OTP-based Account Verification

⚠️ Assumptions & Limitations
Only email/password-based authentication

OTP-based email verification and password reset

No public wishlist sharing (yet)

No user roles (all collaborators have equal access)

Collaborators must be invited via email manually

🚀 Future Improvements
Add role-based permissions (Viewer vs Editor)

Enable public view links for wishlists

Support product image uploads (via Cloudinary or S3)

Add real-time collaboration (via Socket.io)

Implement refresh token mechanism

Add pagination or infinite scroll for large wishlists

Mobile responsiveness improvements

🙌 Special Thanks
Thanks to:

Render for hosting the app

Brevo for SMTP services

MongoDB Atlas for the free cloud database

📬 Contact
For suggestions, issues, or feedback:

Email: your-email@example.com
GitHub: https://github.com/yourusername

yaml
Copy
Edit


### 📦 Backend Setup

```bash
cd backend
npm install

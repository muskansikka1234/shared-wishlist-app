<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Shared Wishlist App</title>
</head>
<body style="font-family: sans-serif; line-height: 1.6; padding: 2rem; max-width: 800px; margin: auto; background-color: #f9f9f9;">

  <h1>📝 Shared Wishlist App</h1>
  <p>A full-stack collaborative wishlist app where users can create wishlists, add products, and invite collaborators to contribute in real-time.</p>

  <hr>

  <h2>🚀 Live Demo</h2>
  <ul>
    <li>🔗 Frontend: <a href="https://shared-wishlist-app-frontend.onrender.com" target="_blank">https://shared-wishlist-app-frontend.onrender.com</a></li>
    <li>🔗 Backend: <a href="https://shared-wishlist-app-backend.onrender.com" target="_blank">https://shared-wishlist-app-backend.onrender.com</a></li>
  </ul>

  <hr>

  <h2>🧑‍💻 Tech Stack</h2>
  <h3>Frontend:</h3>
  <ul>
    <li>React (Vite)</li>
    <li>React Router DOM</li>
    <li>Axios</li>
    <li>React Toastify</li>
    <li>Tailwind CSS</li>
  </ul>
  <h3>Backend:</h3>
  <ul>
    <li>Node.js + Express</li>
    <li>MongoDB (Mongoose)</li>
    <li>JWT (Authentication)</li>
    <li>BcryptJS (Password Hashing)</li>
    <li>Nodemailer + Brevo SMTP (Email Service)</li>
  </ul>
  <h3>Deployment:</h3>
  <ul>
    <li>Render (both frontend & backend)</li>
  </ul>

  <hr>

  <h2>⚙️ Setup Instructions</h2>

  <h3>🔧 Prerequisites</h3>
  <ul>
    <li>Node.js and npm installed</li>
    <li>MongoDB URI (Atlas or local)</li>
    <li>Brevo SMTP credentials (for email OTP)</li>
  </ul>

  <h2>📦 Backend Setup</h2>
  <pre><code>git clone https://github.com/your-username/shared-wishlist-app.git
cd shared-wishlist-app/backend
npm install
</code></pre>

  <h3>Create <code>.env</code> file in <code>backend/</code>:</h3>
  <pre><code>PORT=4000
MONGODB_CONNECTION_STRING=your_mongo_uri
JWT_SECRET=your_jwt_secret
SENDER_EMAIL=your_brevo_email
SMTP_USER=your_brevo_user
SMTP_PASS=your_brevo_pass
NODE_ENV=production
</code></pre>

  <h3>Start backend server:</h3>
  <pre><code>node src/Server.js</code></pre>

  <h2>💻 Frontend Setup</h2>
  <pre><code>cd ../frontend
npm install
</code></pre>

  <h3>Create <code>.env</code> file in <code>frontend/</code>:</h3>
  <pre><code>VITE_BACKEND_URL=https://shared-wishlist-app-backend.onrender.com</code></pre>

  <h3>Start frontend:</h3>
  <pre><code>npm run dev</code></pre>

  <hr>

  <h2>📽️ Demo Video</h2>
  <p>🎥 Watch here: 
    <a href="https://www.loom.com/share/a8224a49fcbe4bd1b1d5903b8043419c?sid=a2c99b18-aa7c-47c9-8621-1eae4c5e0c3d" target="_blank">
      Loom Demo
    </a>
  </p>

  <hr>

  <h2>🔮 Future Improvements</h2>
  <ul>
    <li>✅ Real-time sync using Socket.IO</li>
    <li>✅ Email-based invite token system</li>
    <li>🖼️ Image uploads via Cloudinary</li>
    <li>🔐 Role-based access for collaborators</li>
    <li>📱 Better mobile responsiveness</li>
    <li>🔍 Product filtering and search</li>
    <li>♻️ Refresh tokens & auto-logout on expiry</li>
  </ul>

  <hr>

  <h2>🙌 Contributing</h2>
  <p>Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.</p>

  <hr>

  <h2>📄 License</h2>
  <p>This project is open-source and available under the <a href="LICENSE" target="_blank">MIT License</a>.</p>

</body>
</html>

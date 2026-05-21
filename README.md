
# 📖 Blog Site

A full-stack blogging platform where users can **browse blogs, read details, add new posts, update their own posts, and maintain a wishlist**.
Built with **React (Vite)**, **Firebase Authentication**, **Node.js + Express**, and **MongoDB**.

🔗 **Live Demo:** [log-web-34782.web.app](https://log-web-34782.web.app/)

💻 **Client Repo:** [blog-site-client-side](https://github.com/IFTI-KAR/blog-site-client-side)

🗄 **Server Repo:** [blog-server-side](https://github.com/IFTI-KAR/blog-server-side)

---

## 🚀 Features

* 🔐 **User Authentication** – Sign up, log in, and log out using Firebase Auth.
* 📝 **Add Blogs** – Authenticated users can post new blogs with title, description, and category.
* 📚 **View All Blogs** – Browse all blogs with pagination and filtering options.
* ⭐ **Wishlist** – Save your favorite blogs for quick access.
* 🔍 **Blog Details** – View detailed blog content (private route).
* ✏ **Update Blog** – Edit your own blogs securely.
* 📌 **Featured Blogs** – Highlighted popular blogs.
* 🛡 **Protected Routes** – Only logged-in users can add blogs, view details, update, or access wishlist.
* 📱 **Responsive Design** – Works seamlessly on mobile, tablet, and desktop.

---

## 🛠 Tech Stack

### **Frontend**

* React (Vite)
* React Router DOM
* Firebase Authentication
* Tailwind CSS
* DaisyUI

### **Backend**

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

---

## 📂 Folder Structure (Client)

```
src/
 ├── context/
 │   └── PrivsteRoute/PrivateRoute.jsx  # Protects private pages
 ├── firebase/
 │   └── firebase.init.js               # Firebase config
 ├── layouts/
 │   └── Rootlayout.jsx                  # Main layout wrapper
 ├── pages/
 │   ├── Addblog/
 │   ├── Allblogs/
 │   ├── BlogDetails/
 │   ├── Faq/
 │   ├── FeatureCard/
 │   ├── Featured/
 │   ├── Home/                           # Banner, Newsletter, etc.
 │   ├── Login/
 │   ├── RecentBlog/
 │   ├── Register/
 │   ├── Shared/
 │   ├── Trending/
 │   ├── UpdateBlog/
 │   └── Wishlist/
 └── router/
     └── router.jsx                      # All routes configuration
```

---

## 🔑 Environment Variables

Create a `.env` file in both **client** and **server** folders.

### Client `.env`:

```
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_project.firebaseapp.com
VITE_projectId=your_project_id
VITE_storageBucket=your_project.appspot.com
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id
VITE_SERVER_URL=http://localhost:5000
```

### Server `.env`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## ⚡ Installation & Setup

### 1️⃣ Clone the repositories

```bash
# Client
git clone https://github.com/IFTI-KAR/blog-site-client-side.git
cd blog-site-client-side
npm install

# Server
git clone https://github.com/IFTI-KAR/blog-server-side.git
cd blog-server-side
npm install
```

### 2️⃣ Set up environment variables

Add `.env` files to both **client** and **server** with the keys shown above.

### 3️⃣ Run the development servers

```bash
# Run server
cd blog-server-side
npm run dev

# Run client
cd blog-site-client-side
npm run dev
```

---

## 🔒 Protected Routes

The following routes require login:

* `/add-blog`
* `/blogs/:id` (Blog Details)
* `/wishlist`
* `/blogs/update/:id`

These are wrapped with `PrivateRoute` to ensure only authenticated users can access them.

---

## 📌 API Endpoints

| Method | Endpoint     | Description            |
| ------ | ------------ | ---------------------- |
| GET    | `/blogs`     | Fetch all blogs        |
| GET    | `/blogs/:id` | Get blog details       |
| POST   | `/blogs`     | Add new blog (Auth)    |
| PATCH  | `/blogs/:id` | Update blog (Auth)     |
| DELETE | `/blogs/:id` | Delete blog (Auth)     |
| GET    | `/wishlist`  | Get wishlist (Auth)    |
| POST   | `/wishlist`  | Add to wishlist (Auth) |

---


---

## 👨‍💻 Author

**IFTIKAR RAHAMAN**
Frontend Developer | MERN Stack Developer

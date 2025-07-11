# 🧵 Threads App – MERN Social Media Clone

A full-stack social media web application inspired by Meta’s Threads. This project enables users to create short, threaded conversations, engage with posts through replies, likes, and reposts, and follow other users—delivering a clean, responsive social platform experience built with MongoDB, Express, React, and Node.js.

## 🔗 DEMO
*(Add your live site link here if available)*

---

## 📋 Table of Contents

- [Overview](#-overview)  
- [Features](#-features)  
- [Technologies](#-technologies)  
- [API Endpoints](#-api-endpoints)  
- [Project Structure](#-project-structure)  
- [Contact](#-contact)  
- [Credits](#-credits)

---

## 📖 Overview

**Threads App** is a MERN-based social networking platform inspired by Meta’s Threads. It offers user authentication, profile management, thread-based posting, social interactions (like, repost, reply), and a modern UI/UX experience. It's designed to replicate key Twitter/Threads features in a self-hostable environment.

---

## ✨ Features

- 🔐 User Authentication with JWT  
- 🧑‍💼 Profile creation and editing  
- 🧵 Create, like, reply to, and repost threads  
- 🖼 Upload and manage profile images via **Cloudinary**  
- 🔁 Follow/unfollow users  
- 🧭 Suggested users and user search functionality  
- 🌗 Supports **Dark and Light Mode** with smooth toggle  
- ⚡ Real-time activity tracking (WebSocket-ready or polling-based)  
- 🎨 Fully responsive design using **Tailwind CSS** and **Lucide icons**  
- ⚛ Built with modern **React** and **React Router v7**  
- 📦 Global state managed with **Zustand**  
- 🔄 Full RESTful API communication using **Axios**

---

## 🛠 Technologies

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js)
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express)
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb)
- ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose)
- ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens)
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
- ![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=for-the-badge&logo=react-router)
- ![Zustand](https://img.shields.io/badge/Zustand-252525?style=for-the-badge&logo=zod)
- ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
- ![Lucide Icons](https://img.shields.io/badge/Lucide--React-000000?style=for-the-badge&logo=lucide)

---

## 📘 API Endpoints

### 🔐 Auth & User Routes

| Method | Endpoint                        | Protected | Description                         |
|--------|----------------------------------|-----------|-------------------------------------|
| POST   | `/api/auth/signup`              | ❌        | Register a new user                 |
| POST   | `/api/auth/login`               | ❌        | Login user                          |
| POST   | `/api/auth/logout`              | ❌        | Logout user                         |
| PUT    | `/api/auth/update-profile`      | ✅        | Update user profile                 |
| GET    | `/api/auth/check`               | ✅        | Check session authentication        |
| GET    | `/api/auth/get-profile`         | ✅        | Get current user profile            |
| GET    | `/api/auth/search`              | ✅        | Search for users                    |
| GET    | `/api/auth/suggestedUsers`      | ✅        | Suggested users to follow           |
| GET    | `/api/auth/:id`                 | ✅        | Get profile by ID                   |
| PUT    | `/api/auth/toggle-follow/:id`   | ✅        | Follow or unfollow a user           |

---

### 🧵 Thread Routes

| Method | Endpoint                              | Protected | Description                         |
|--------|----------------------------------------|-----------|-------------------------------------|
| GET    | `/api/thread/get-allthreads`          | ❌        | Fetch all threads                   |
| GET    | `/api/thread/user-threads`            | ✅        | Get current user threads            |
| GET    | `/api/thread/user-threads/:id`        | ✅        | Get specific user's threads         |
| GET    | `/api/thread/user-replies/:id`        | ✅        | Get replies by a user               |
| GET    | `/api/thread/user-reposts/:id`        | ✅        | Get reposts by a user               |
| GET    | `/api/thread/Activity`                | ✅        | Get user activity                   |
| GET    | `/api/thread/:id`                     | ❌        | Get thread by ID                    |
| POST   | `/api/thread/create`                  | ✅        | Create a new thread                 |
| POST   | `/api/thread/:id/toggle-like`         | ✅        | Like or unlike a thread             |
| POST   | `/api/thread/:id/toggle-repost`       | ✅        | Repost or remove repost             |
| POST   | `/api/thread/:id/reply`               | ✅        | Reply to a thread                   |
| DELETE | `/api/thread/:id`                     | ✅        | Delete a thread                     |
| PUT    | `/api/thread/:id`                     | ✅        | Update thread content               |

> 🔐 **Protected** routes require a valid JWT token.

---

## 🧭 Project Structure

```bash
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js

├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   ├── public/
│   └── vite.config.js
```
---
 ## 📬 Contact

- **Name**: Amr Ashraf  
- **Email**: [amrashraf1592@gmail.com](mailto:amrashraf1592@gmail.com)  
- **GitHub**: [amrashraf15](https://github.com/amrashraf15)  
- **Project Link**: [Threds-App](https://github.com/amrashraf15/Threads-app/tree/main)

---



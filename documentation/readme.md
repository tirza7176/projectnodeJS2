# 📦 Business Cards API - Server Side

**Creator:** Tirza Simon  
**Email:** t0527179413@gmail.com

---

## 📄 Overview

This is the backend server for a Business Cards application, built with Node.js, Express, and MongoDB. It provides a full REST API for managing users and business cards, including registration, login, authorization, and card CRUD operations.

---

## 📚 Documentation

- [👤 Users API Documentation](./users_api.md)
- [📇 Cards API Documentation](./cards_api.md)

---

## Running the Project

### 🖥 Locally (Local Server)

1. Make sure you have **MongoDB** installed and running on your machine.
2. Clone the project and navigate to the root directory.
3. Create a `.env` file with the following:
   ```
   MONGO_URI_DEV=mongodb://localhost/myrest_api_project
   PORT=3000
   JWT_SECRET=your_jwt_secret
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

Server will be running on:  
👉 `http://localhost:3000`

---

### ☁️ Running on the Cloud (MongoDB Atlas)

1. Create a `.env` file with:
   ```
   MONGO_URI_PROD=mongodb+srv://t0527179413:ists8466@cluster0.lbcyzwb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   PORT=3000
   JWT_SECRET=your_jwt_secret
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

---

## 🌱 Seeding the Database

To populate the database with initial data (users and cards):

> ⚠️ **Warning:** This will delete all existing users and cards!

1. Ensure the `.env` file has a working `MONGO_URI_DEV`.
2. Run the seed script:
   ```bash
   node seed.js
   ```

---

## 👤 Users API

| No. | Action                 | Authorization   | Method | URL            |
| --- | ---------------------- | --------------- | ------ | -------------- |
| 1   | Register new user      | all             | POST   | `/users`       |
| 2   | Login                  | all             | POST   | `/users/login` |
| 3   | Get all users          | admin           | GET    | `/users`       |
| 4   | Get user by ID         | user or admin   | GET    | `/users/:id`   |
| 5   | Update user info       | registered user | PUT    | `/users/:id`   |
| 6   | Toggle business status | registered user | PATCH  | `/users/:id`   |
| 7   | Delete user            | user or admin   | DELETE | `/users/:id`   |

---

## 📇 Cards API

| No. | Action             | Authorization       | Method | URL               |
| --- | ------------------ | ------------------- | ------ | ----------------- |
| 1   | Get all cards      | all                 | GET    | `/cards`          |
| 2   | Get user’s cards   | registered user     | GET    | `/cards/my-cards` |
| 3   | Get card by ID     | all                 | GET    | `/cards/:id`      |
| 4   | Create a new card  | business user       | POST   | `/cards`          |
| 5   | Edit a card        | creator of the card | PUT    | `/cards/:id`      |
| 6   | Like/Unlike a card | registered user     | PATCH  | `/cards/:id`      |
| 7   | Delete a card      | creator or admin    | DELETE | `/cards/:id`      |

---

## 📬 Contact

For questions, please contact:  
✉️ t0527179413@gmail.com

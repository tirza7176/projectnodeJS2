# 📘 Users API Documentation

This document describes the available endpoints for managing users in the server-side application.

---

## 🔐 Authorization Levels

- **all** – No authentication required.
- **user** – Authenticated user with a valid token.
- **admin** – Admin users only.

---

## 1. Register a New User

- **Method:** `POST`
- **URL:** `/users`
- **Authorization:** `all`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
  "name": { "first": "...", "middle": "...", "last": "..." }, // Object
  "email": "string",
  "password": "string",
  "adress": { "state": "...", "country": "...",  "city": "...",  "street": "...","houseNumber": number,
    "zip": number}, //object
    "image": {
      "url": "...", "alt": "..."
    }, // Object

  "isBusiness": true
  }
  ```

---

## 2. login

- **Method:** `POST`
- **url:** `/users/login`
- **Authorization:** `all`
- **Description:** Log in and receive a JWT token.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

---

## .3 Get All Users

- **Method:** `GET`
- **url:** `/users`
- **Authorization:** `Admin`
- **Description:** Get an array of all users (admin only).

---

## .4 Get User By Id

- **Method:** `GET`
- **url:** `/users/:id`
- **Authorization:** `user or Admin`
- **Description:** Get data of a specific user by their ID.

---

## .5 Update User by ID

- **Method:** `PUT`
- **url:** `/users/:id`
- **Authorization:** `user`
- **Description:** Update the logged-in user's information.
- **Request Body:**
  ```json
  {
  "name": { "first": "...", "middle": "...", "last": "..." }, // Object
  "adress": { "state": "...", "country": "...",  "city": "...",  "street": "...","houseNumber": number,
    "zip": number}, //object
  "isBusiness": true
  }
  ```

---

## .6 Change Business Status

- **Method:** `PATCH`
- **url:** `/users/:id`
- **Authorization:** `user`
- **Description:** Toggle the isBusiness status of the logged-in user.

---

## .7 Delete User

- **Method:** `DELETE`
- **url:** `/users/:id`
- **Authorization:** `user or Admin`
- **Description:** Delete a user account. Users can delete their own account; admins can delete any.

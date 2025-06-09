# 📇 Cards API Documentation

This document describes the available endpoints for managing business cards in the application.

---

## 🔐 Authorization Levels

- **all** – No authentication required.
- **user** – Authenticated user with a valid token.
- **business user** – A registered user with `isBusiness: true`.
- **admin** – Admin users only.

---

## 1. Get All Cards

- **Method:** `GET`
- **URL:** `/cards`
- **Authorization:** `all`
- **Description:** Retrieve an array of all cards.

---

## 2. Get My Cards

- **Method:** `GET`
- **URL:** `/cards/my-cards`
- **Authorization:** `user`
- **Description:** Retrieve only the cards created by the logged-in user.

---

## 3. Get Card by ID

- **Method:** `GET`
- **URL:** `/cards/:id`
- **Authorization:** `all`
- **Description:** Retrieve a specific card by its ID.

---

## 4. Create New Card

- **Method:** `POST`
- **URL:** `/cards`
- **Authorization:** `business user`
- **Description:** Create a new business card.
- **Request Body Example:**
  ```json
  {
    "title": "string",
    "subtitle": "string",
    "description": "string",
    "phone": "string",
    "email": "string",
    "web": "string",
    "image": {
      "url": "string",
      "alt": "string"
    },
    "address": {
      "state": "string",
      "country": "string",
      "city": "string",
      "street": "string",
      "houseNumber": number,
      "zip": number
    }
  }
  ```

---

## 5. Edit Card

- **Method:** `PUT`
- **URL:** `/cards/:id`
- **Authorization:** user (only the card creator)
- **Description:** Update an existing card.

---

## 6. Like/Unlike Card

- **Method:** `PATCH`
- **URL:** `/cards/:id`
- **Authorization:** user
- **Description:** Like or unlike a card (toggle). The card ID will be added or removed from the user's liked list.

---

## 7. Delete Card

- **Method:** `DELETE`
- **URL:** `/cards/:id`
- **Authorization:** user (card owner) or admin
- **Description:** Delete a card by ID.

# Book Review API

A RESTful API for managing books and reviews, built using **Node.js**, **Express**, and **MongoDB**, with **JWT-based authentication**.

## Features

- User Signup & Login (JWT Auth)
- Add, Get, and Search Books
- Submit, Update, and Delete Reviews
- Pagination and filtering for books and reviews
- Clean and modular codebase

---

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- dotenv

---

## Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/Gulshan2589/BillEasyBookReviewApi.git
cd BillEasyBookReviewApi
```

### 2. Install Dependencies

```bash
npm install
```

### 4. Run the Server

```bash
npm start
```

---

## API Endpoints

### Auth

#### POST `/api/v1/signup`  
Register a new user  
**Body:**

```json
{
  "username":"gulshan123",
  "email":"gulsanvarma2589@gmail.com",
  "firstName":"Gulshan",
  "lastName":"Varma",
  "password":"Gulshan@123"
}
```

#### POST `/api/v1/login`  
Login user  
**Body:**

```json
{
  "email":"gulsanvarma2589@gmail.com",
  "password":"Gulshan@123"
}
```

---

### Books

#### POST `/api/v1/books` (Auth Required)  
Add a new book  
**Body:**

```json
{
  "title": "Book Title",
  "author": "Author",
  "genre": "Genre"
}
```

#### GET `/api/v1/books`  
Fetch books with optional filters with Pagination
Query params: `?limit=10&page=1&genre=fiction&author=Harper Lee`


#### GET `/api/v1/search`  
Search books with author and title
`?q=Rich`

#### GET `/api/v1/books/id`  
Get book details by ID (includes average rating and reviews)

---

### Reviews

#### POST `/api/v1/books/:id/reviews` (Auth Required)  
Submit a review (only once per book)  
**Body:**

```json
{
  "rating": 4,
  "comment": "Great book!"
}
```

#### PUT `/api/v1/reviews/:id` (Auth Required)  
Update your own review
**Body:**

```json
{
  "rating": 2,
  "comment": "this is good book!"
}
```

#### DELETE `/api/v1/reviews/:id` (Auth Required)  
Delete your own review

---

## Database Schema

### User

```js
 {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
  }
```

### Book

```js
{
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
}
```

### Review

```js
{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'book', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
}
```

---

## Design Decisions & Assumptions

- JWT tokens are used for authentication.
- Each user can submit only one review per book.
- Book search is case-insensitive and matches partial titles/authors.
- Pagination defaults to 10 items per page if not provided.
- Only the review owner can update or delete their review.

---

## Example Requests
please find a postman collection below for tetsting the API

```bash
https://documenter.getpostman.com/view/26528383/2sB2qdh17W
```
---


📚 Book Haven

A modern online library where users can browse, add, update, delete, and review books.

✅ Project Overview

Book Haven is a full-stack MERN project with Firebase Authentication. Users can securely log in, explore books, add new books, and leave comments. The system follows CRUD operations and organized code structure for both client and server.

🔗 Live Links

Frontend Live: https://your-client-live-link.com
Backend Live: https://your-server-live-link.com
Client GitHub: https://github.com/your-client-repo
Server GitHub: https://github.com/your-server-repo

⭐ Features
🔒 Authentication

Firebase Email & Password Auth

Private routes (Add Book, Update Book)

📚 Book Management (CRUD)

Add New Book

View All Books

View Single Book Details

Update Book

Delete Book

💬 Comment System

Users can comment on each book detail page

Shows user photo, name, and time

🏷️ Category & Home Page

Latest 6 books show on the Home page

Genre-based browsing

Hero banner section

Fully responsive UI

✅ Additional Good Features

Loading spinner

Error handling

Clean UI with Tailwind CSS + DaisyUI

Secure MongoDB connection

Axios API Layer

🛠️ Technologies Used
Frontend

React.js

React Router

Firebase Auth

Axios

Tailwind CSS

DaisyUI

Backend

Node.js

Express.js

MongoDB (Atlas)

CORS

dotenv

📡 API Endpoints
Books

GET /books – Get all books
GET /book/:id – Get single book
POST /add-book – Add new book
PUT /update-book/:id – Update a book
DELETE /delete-book/:id – Delete a book

Comments

POST /book/:id/comments – Add a comment to a book
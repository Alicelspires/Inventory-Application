# Inventory Application

A complete full-stack bookstore inventory system built with Express and PostgreSQL (Neon), offering CRUD operations, image uploads, sorting, filtering, and elegant server-rendered interfaces using EJS + Tailwind CSS.

Although developed as part of The Odin Project, the codebase follows a clean, production-oriented MVC architecture.

![The Odin Project](https://img.shields.io/badge/The%20Odin%20Project-e3b261?style=for-the-badge&logo=theodinproject&logoColor=000000&link=https%3A%2F%2Fwww.theodinproject.com%2Fpaths%2Ffull-stack-javascript%2Fcourses%2Fnodejs)

## Live Demo

`Vercel`: []()

## Tech Stack & Tools

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-8BC34A?logo=ejs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-FFCA28?logo=node.js&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Neon](https://img.shields.io/badge/NeonDB-00E599?logo=postgresql&logoColor=white)
![Express-Validator](https://img.shields.io/badge/express%20validator-3a0f57?logo=norton&logoColor=%23a752e0)

## Main Page

<img width="500px" align="center" src="./public/img/mainPage.png" alt="High Fidelity Prototype">

### Design

<details>
<summary>High Fidelity Prototype</summary>
<img width="500px" align="center" src="./public/img/highFidelityPrototype.png" alt="Design System">
</details>

<details>
<summary>Design System</summary>
<img width="500px" align="center" src="./public/img/designSystem.png" alt="Design System">
</details>

## Features

- Create, edit, delete books (CRUD)
- Upload cover images (Multer)
- Metadata support: title, author, year, genre, description
- Full validation with express-validator

### Search, Filter & Sort

- Filter books by genres
- Sort options:
  - Title (A–Z / Z–A)
  - Year (Oldest / Newest)

### Database Layer

- PostgreSQL hosted on **NeonDB**

### UI (Tailwind + EJS)

- Tailwind CSS v4
- Modern, minimal, responsive UI
- Clean EJS templates

## Tech Stack

### Backend

- Node.js
- Express 5
- Express Validator
- Multer (image uploads)
- PostgreSQL (NeonDB)

### Frontend

- EJS
- Tailwind CSS 4
- Vanilla JavaScript

## Folder Structure

<details>
  <summary>Folder Structure</summary>
 
  ```
  books-inventory/
  │
  ├─ app.js
  ├─ package.json
  |
  ├─ db/
  │   └─ pool.js
  │
  ├─ controllers/
  │   ├─ indexController.js
  │   └─ booksController.js
  |
  ├─ services/
  │   └─ booksService.js
  |
  ├─ repository/
  │   └─ booksRepository.js
  |
  ├─ utils/
  │   └─ normalizeGenre.js
  |
  ├─ routes/
  │   ├─ booksRouter.js
  │   └─ indexRouter.js
  │
  ├─ validators/
  │   └─ booksValidators.js
  │
  ├─ middlewares/
  │   └─ upload.js
  │
  ├─ public/
  │   ├─ js/
  |   │   └─ sidebar.js
  │   ├─ css/
  |   |   ├─ style.css
  |   |   └─ custom.css
  │   ├─ uploads/ <- bookcovers
  |   └─ img/
  |
  └─ views/
      ├─ components/
      |    ├─ cardsBooks.ejs
      |    ├─ footer.ejs
      |    ├─ navbar.ejs
      |    ├─ form.ejs
      |    └─ sidebar.ejs
      |
      ├─ updateBook.ejs
      ├─ index.ejs
      ├─ createBook.ejs
      ├─ books.ejs
      └─ deleteBook.ejs

  ```

</details>

## Architecture validation

<img alt="image" width="550" src="./public/img/web_server_form_handling.png"/>

## Database Schema

<img alt="image" width="550" src="./public/img/bd_books.png"/>
<p><i>https://dbdiagram.io/d</i></p>

## Setup & Installation

1. Clone the repository

```bash
git clone https://github.com/AliceSilva/books-inventory.git
cd books-inventory
```

2. Install dependencies

```bash
npm install
```

3. Create `.env`

```
DATABASE_URL=your_neon_connection_string
PORT=8080
```

## Running the Project

Development mode (server + Tailwind watcher)

```bash
npm run dev
```

Build Tailwind for production

```bash
npm run css:build
```

Start server normally

```
npm start
```

Server runs at:

```
http://localhost:6969
```

## Image Upload System

- Uploads stored in: `public/uploads/`
- Max file size: **5MB**

## License

**MIT License** — free to modify & share.
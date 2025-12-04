const booksService = require("../services/booksService.js");
const { normalizeGenre } = require("../utils/normalizeGenre.js");
const { validationResult, matchedData } = require("express-validator");
const fs = require("fs");
const path = require("path")

// Showing all existing books that match the selected filter and sorting criteria
exports.bookListGet = async (req, res) => {
  let genresSelected = normalizeGenre(req.query.genre); // normalizing all the genres in camelcase structure
  let sortSelected = req.query.sort;

  try {
    const genres = await booksService.getListGenres();
    const books = await booksService.getListBooks({
      genre: genresSelected,
      sort: sortSelected,
    });

    res.render("books", { books, genres, genresSelected, sortSelected });

  } catch (e) {
    console.log(e);
  }
};



// Render the create book page ============================
exports.bookCreatePostPage = async (req, res) => {
  const genres = await booksService.getListGenres();
  res.render("createBook", {genres, errors: "" });
};

// Creating new book 
exports.bookCreatePost = async (req, res) => {
  const error = validationResult(req);
  const bookData = matchedData(req);

  let genres = req.body.categories || [];
  
  // bookcover filename 
  if (!genres) {
    bookData.genres = [];
  } else if (typeof genres === "string") {
    bookData.genres = genres.split(",").map(g => g.trim());
  } else {
    bookData.genres = genres;
  }

  if (req.file) {
    bookData.book_cover = "/uploads/" + req.file.filename;
  }

  // if it didn't passed through the validation
  if(!error.isEmpty()){
    return res.render("createBook", {
      book: bookData, // keeps the data that the user has already entered, without clearing the form
      errors: error.array(),
      genres: await booksService.getListGenres()
    } )
  }

  try {
    await booksService.createBook(bookData);
    res.redirect("/books");

  } catch (e) {
    console.log(e)
  }
};



// Updating existing book informations ======================
exports.bookUpdateGet = async (req, res) => {
  const idBook = req.params.id

  try {
    const bookByID = await booksService.findBookById(idBook)
    const genres = await booksService.getListGenres()
  
    res.render("updateBook", {book: bookByID, genres, errors: ""});
  } catch(e) {
    console.log("Error" + e)
  }
};

exports.bookUpdatePost = async (req, res) => {
  const error = validationResult(req);
  const bookData = matchedData(req);
  const id = req.params.id;
  const oldBook = await booksService.findBookById(id);

  // genres will already come as an array from your validator
  const genres = req.body.categories || [];

  // new bookcover (if sent)
  if (req.file) {
    bookData.book_cover = "/uploads/" + req.file.filename;

    if (oldBook.book_cover && oldBook.book_cover !== "/uploads/bookcover-default.jpg") {
      const fileName = path.basename(oldBook.book_cover)
      const oldPath = path.join(process.cwd(), "public", "uploads", fileName);

      fs.rm(oldPath, err => {
        if (err) console.log("Error deleting old image:", err);
      });
    }
  } 

  if (!error.isEmpty()) {
    const book = await booksService.findBookById(id);

    return res.render("createBook", {
      book: { ...book, ...bookData, genres },
      errors: error.array(),
      genres: await booksService.getListGenres()
    });
  }

  try {
    await booksService.updateBook(id, { ...bookData, genres });
    res.redirect(`/books`);
  } catch (e) {
    console.log(e);
  }
};



// Get ID book to Delete page ===============================
exports.bookDeleteGet = async (req, res) => {
  const idBook = req.params.id;

  try {
    const bookByID = await booksService.findBookById(idBook)

    res.render("deleteBook", {book: bookByID});
  } catch(e) {
    console.log("Error" + e)
  }
};

// Delete book selected
exports.bookDeletePost = async (req, res) => {
  const id = req.params.id;
  const oldBook = await booksService.findBookById(id);

  if (
      oldBook.book_cover && 
      oldBook.book_cover !== "/uploads/bookcover-default.jpg"
    ) {
    const fileName = path.basename(oldBook.book_cover)
    const oldPath = path.join(process.cwd(), "public", "uploads", fileName);

    fs.rm(oldPath, err => {
      if (err) console.log("Error deleting old image:", err);
    });
  } 

  try {
    await booksService.deleteBookById(id);
    res.redirect("/books");

  } catch(e) {
    console.log("Error" + e)
  }
};
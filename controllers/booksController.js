const { error } = require("console");
const booksService = require("../services/booksService.js");
const { normalizeGenre } = require("../utils/normalizeGenre.js");
const { validationResult, matchedData } = require("express-validator");

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

// Render the create book page
exports.bookCreatePostPage = async (req, res) => {
  const genres = await booksService.getListGenres();
  res.render("createBook", {genres, errors: "" });
};

// Creating new book
exports.bookCreatePost = async (req, res) => {
  const error = validationResult(req);
  const bookData = matchedData(req);

  let genres = req.body.categories;
  
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

// Updating existing book informations
exports.bookUpdateGet = async (req, res) => {
  const idBook = req.params.id

  try {
    const bookByID = await booksService.findBookById(idBook)
    const genres = await booksService.getListGenres()

    res.render("updateBook", {book: bookByID, genres});
  } catch(e) {
    console.log("Error" + e)
  }
};

exports.bookUpdatePost = async (req, res) => {
  res.render("updateBook");
};

exports.bookDeleteGet = async (req, res) => {
  const idBook = req.params.id;

  try {
    const bookByID = await booksService.findBookById(idBook)

    res.render("deleteBook", {book: bookByID});
  } catch(e) {
    console.log("Error" + e)
  }
};

exports.bookDeletePost = async (req, res) => {
  res.render("deleteBook");
};
const { match } = require("assert");
const booksService = require("../services/booksService.js");
const { normalizeGenre } = require("../utils/normalizeGenre.js");
const { validationResult, matchedData } = require("express-validator");

exports.bookListGet = async (req, res) => {
  let genresSelected = normalizeGenre(req.query.genre); // normalizing all the genres in camel case structure
  let sortSelected = req.query.sort;

  try {
    const genres = await booksService.getListGenres();
    const books = await booksService.getListBooks({
      genre: genresSelected,
      sort: sortSelected,
    });

    res.render("books", { books, genres, genresSelected });

  } catch (e) {
    console.log(e);
  }
};

// Render the create book page
exports.bookCreatePostPage = async (req, res) => {
  const genres = await booksService.getListGenres();
  res.render("createBook", {genres});
};

// Creating new book
exports.bookCreatePost = async (req, res) => {
  const error = validationResult(req);
  const bookData = matchedData(req);

  if(!error.isEmpty()){
    res.render("createBook", {
      book: bookData, // keeps the data that the user has already entered, without clearing the form
      errors: errors.array()
    } )
  }

  try {
    await booksService.createBook(bookData);
    res.redirect("/books");

  } catch (e) {
    console.log(e)
  }
};

exports.bookUpdateGet = (req, res) => {
  res.render("updateBook");
};

exports.bookUpdatePost = (req, res) => {
  res.render("updateBook");
};

exports.bookDeleteGet = (req, res) => {
  res.render("deleteBook");
};

exports.bookDeletePost = (req, res) => {
  res.render("deleteBook");
};
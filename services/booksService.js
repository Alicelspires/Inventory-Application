const booksRepository = require("../repository/booksRepository.js");

exports.getListBooks = async ({ genre, sort } = {}) => {
  const { books } = await booksRepository.getAllBooks({ genre, sort });
  return books;
};

exports.getListGenres = async () => {
  const { genres } = await booksRepository.getAllGenres();

  return genres.map(g => ({
    ...g,
    name_genre: g.name_genre.charAt(0).toUpperCase() + g.name_genre.slice(1),
  }));
};

exports.createBook = async (newBook) => {
  return await booksRepository.insertNewBook(newBook);
}
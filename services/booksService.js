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
  const insertBook = await booksRepository.insertNewBook(newBook);

  if (newBook.genres && newBook.genres.length > 0) {
    await booksRepository.addGenresToBook(insertBook.id_book, newBook.genres);
  }
  return insertBook;
}

exports.findBookById = async (id) => {
  const book = await booksRepository.selectBookById(id)
  return book;
}

exports.updateBook = async (id, data) => {
  // update basic data
  await booksRepository.updateBook(id, data);
  
  // remove old genres linked to the data[id]
  await booksRepository.cleanGenreFromBook(id);

  // add new genres
  if(data.genres && data.genres.length > 0){
    await booksRepository.addGenresToBook(id, data.genres)
  }
}

exports.deleteBookById = async (id) => {
  await booksRepository.deleteBookFromDB(id);
  await booksRepository.cleanGenreFromBook(id);

}
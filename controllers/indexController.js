const booksService = require("../services/booksService.js");

exports.inventoryInfo = async (req, res) => {
  try {
    const books = await booksService.getListBooks();
    const genres = await booksService.getListGenres();

    res.render("index", { books, genres });

  } catch (e) {

    console.log(e)
  }
}
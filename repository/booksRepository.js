// repository/booksRepository.js
const pool = require("../db/pool.js");

function getFilteredBooks(sort) {
  let querySort = "";

  if (sort) {
    querySort = "ORDER BY ";

    switch (sort) {
      case "asc": querySort += "g.name_genre ASC"; break;
      case "desc": querySort += "g.name_genre DESC"; break;
      case "old": querySort += "b.year_book ASC"; break;
      case "new": querySort += "b.year_book DESC"; break;
    }
  }
  return querySort;
}

function getFilteredGenres(genre) {
  let queryGenre = "";

  if (genre && Array.isArray(genre) && genre.length > 0) {
    queryGenre = `WHERE g.name_genre IN ( ${genre.map(g => `'${g}'`).join(", ")} )`;
  }

  return queryGenre;
}

exports.getAllBooks = async ({ genre, sort }) => {
  try {
    let filteredGenres = getFilteredGenres(genre);
    let definedSorting = getFilteredBooks(sort);

    const allBooks = await pool.query(
      `
      SELECT 
        b.*,
        COALESCE(array_agg(DISTINCT g.name_genre), '{}') AS genres
      FROM books b
      LEFT JOIN books_genres bg ON bg.id_book = b.id_book
      LEFT JOIN genres g ON g.id_genre = bg.id_genre
      ${filteredGenres}
      GROUP BY b.id_book
      ${definedSorting}
      `
    );

    return { books: allBooks.rows };
  } catch (e) {
    console.log("Error searching books: " + e);
  }
};

exports.getAllGenres = async () => {
  const result = await pool.query(`SELECT * FROM genres`);
  return { genres: result.rows };

};

exports.insertNewBook = async (newBook) => {
  const {title, description, publisher, year_book, author, book_cover} = newBook;

  const newBookQuery = await pool.query(`
    INSERT INTO books (title, description, publisher, year_book, author, book_cover)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
   [title, description, publisher, year_book, author, book_cover]
  )

  return newBookQuery.rows[0];
}

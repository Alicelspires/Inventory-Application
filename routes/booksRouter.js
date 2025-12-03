const { Router } = require("express");
const booksController = require("../controllers/booksController");
const { createBookValidation } = require("../validators/booksValidators.js");
const upload = require("../middlewares/upload");
const booksRouter = Router();

// BOOKS PAGE
booksRouter.get("/", booksController.bookListGet);

// ADD NEW BOOK PAGE
booksRouter
    .get("/new", booksController.bookCreatePostPage)
    .post("/new", upload.single("cover"), createBookValidation, booksController.bookCreatePost);

// UPDATE BOOK PAGE
booksRouter
    .get("/:id/update", booksController.bookUpdateGet)
    .post("/:id/update", booksController.bookUpdatePost);

// DELETE BOOK PAGE
booksRouter
    .get("/:id/delete", booksController.bookDeleteGet)
    .post("/:id/delete", booksController.bookDeletePost)

module.exports = booksRouter;
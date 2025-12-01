const express = require("express");
const path = require("node:path");
const booksRouter = require("./routes/booksRouter");
const indexRouter = require("./routes/indexRouter");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); 

app.use("/", indexRouter);
app.use("/books", booksRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const { body } = require("express-validator");
const currentYear = new Date().getFullYear();

exports.createBookValidation = [
  body("title")
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ max: 255 })
        .withMessage("Title cannot exceed 255 characters"),

  body("author")
      .notEmpty()
      .withMessage("Author is required")
      .isLength({ max: 255 })
      .withMessage("Author name cannot exceed 255 characters"),

  body("year")
      .optional()
      .isInt({ min: 1000, max: currentYear })
      .withMessage("Year must be a valid 4-digit number"),

  body("publisher")
      .optional()
      .isLength({ max: 255 })
      .withMessage("Publisher name cannot exceed 255 characters"),

  body("categories")
      .optional()
      .isArray()
      .withMessage("Categories must be an array"),

  body("description")
      .optional()
      .isLength({ max: 2000 })
      .withMessage("Description cannot exceed 2000 characters"),
];
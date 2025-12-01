const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

// INDEX PAGE
indexRouter.get("/", indexController.inventoryInfo);

module.exports = indexRouter;
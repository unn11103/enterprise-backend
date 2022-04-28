module.exports = app => {
    const books = require("../controllers/bookController.js");
    var router = require("express").Router();

    // Create new book
    router.post("/",books.create);
    // Retrieve
    router.get("/",books.findAll);
    // Retrieve with id
    router.get("/:id", books.findOne);
    // Update with id
    router.put("/:id", books.update);
    // Delete with id
    router.delete("/:id", books.delete);

    app.use('/api/books', router);

}
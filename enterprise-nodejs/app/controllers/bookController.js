const db = require("../models");
const Book = db.books;
// Create and Save a new Tutorial
exports.create = (req, res) => {
  if(!req.body.title){
      res.status(400).send({message:"Content can not be empty!"});
      return;
  }
  const book = new Book({
      title: req.body.title,
      description : req.body.description
  });
  //Save in Db
  book
    .save(book)
    .then((data) => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred"
        });
    });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: {$regex: new RegExp(title),$options: "i"} } : {};
    Book.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        });
  
};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Book.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: "Not found"});
            }
            else {
                res.send(data);
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving"})
        });
  
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data cannot be empty"
        });
    }
    const id =  req.params.id;
    Book.findByIdAndUpdate(id,req.body,{useFindAndModify : false})
        .then(data => {
            if(!data){
                res.status(404).send({
                    message: "Cannot update"
                });
            }
            else {
                res.send({message: "Updated!"});
            }
        })
        .catch(err => {
            res.status(500).send({
                message:"Error updating"
            });
                
        });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Book.findByIdAndRemvoe(id)
        .then(data => {
            if(!data){
                res.status(404).send({
                    message: "Not found"
                });
            }
            else {
                res.send({
                    message:"Deleted!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "could not be deleted"
            });
        });
};


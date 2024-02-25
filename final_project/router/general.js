const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', (req, res) => {
    new Promise((resolve) => {
      setTimeout(() => resolve(books), 1000); // Simulate delay
    })
      .then((books) => {
        res.send(JSON.stringify(books, null, 40));
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Internal server error");
      });
  });

// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    new Promise((resolve) => {
        setTimeout(() => resolve(books), 1000); // Simulate delay
      })
        .then((books) => {
          res.send(JSON.stringify(books[isbn], null, 40));
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send("Internal server error");
        });
    });
  
// Get book details based on author
public_users.get('/author/:author', (req, res) => {
    const author = req.params.author;
    return new Promise((resolve, reject) => {
      const bookKeys = Object.keys(books);
      const matchingBooks = bookKeys.filter((isbn) => books[isbn].author === author);
      if (matchingBooks.length === 0) {
        reject(new Error("No books found by that author."));
      } else {
        resolve(matchingBooks.map((isbn) => books[isbn]));
      }
    })
    .then((books) => {
      res.send(JSON.stringify(books)); 
    })
    .catch((error) => {
      res.status(404).send(error.message); 
    });
  });
  

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;

const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    return username.length >= 5 && username.match(/^[a-zA-Z0-9_]+$/);
};

const authenticatedUser = (username, password) => {
    // Check if the username and password match an existing user
    return users.some((user) => user.username === username && user.password === password);
  };
  
  // Login route
  regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    if (isValid(username) && authenticatedUser(username, password)) {
      // Generate a JWT token
      const token = jwt.sign({ username }, "your-secret-key", { expiresIn: "1h" });
  
      // Send the token in the response
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  });
  
  // Add a book review route
  regd_users.put("/auth/review/:isbn", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from header
  
    if (token) {
      try {
        const decoded = jwt.verify(token, "your-secret-key");
        const username = decoded.username;
  
        // Validate user, check review data, and update books database (replace with your logic)
        if (isValidUser(username) && hasValidReviewData(req.body)) {
          updateBookReview(req.params.isbn, req.body);
          res.json({ message: "Review added successfully" });
        } else {
          res.status(400).json({ message: "Invalid request" });
        }
      } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

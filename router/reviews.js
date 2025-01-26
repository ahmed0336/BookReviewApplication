const express = require('express');

const router = express.Router();

const bookReview = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 10.99,
      isbn: "9780743273565",
      reviews: []
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: 8.99,
      isbn: "9780061120084",
      reviews: []
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      price: 9.99,
      isbn: "9780451524936",
      reviews: []
    }
  ];

router.post('/addreview/:isbn', (req, res) => {
    const { isbn } = req.params; // ISBN from the URL
    const { username, review } = req.body; // Review details from request body

    // Find the book by ISBN
    const book = bookReview.find(b => b.isbn === isbn);
    if (!book) return res.status(404).send("Book not found.");
  
    // Check if the user already reviewed the book
    const existingReview = book.reviews.find(r => r.username === username);
    if (existingReview) {
      existingReview.review = review; // Update the review
      res.send("Review updated successfully.");
    } else {
      // Add a new review
      book.reviews.push({ username, review });
      res.send("Review added successfully.");
    }
  });

  router.delete('/deletereview/:isbn', (req, res) => {
    const { isbn } = req.params; // ISBN from the URL
    const { username } = req.body; // Username from request body
  
    // Find the book by ISBN
    const book = bookReview.find(b => b.isbn === isbn);
    if (!book) return res.status(404).send("Book not found.");
  
    // Check if the user has a review for this book
    const reviewIndex = book.reviews.findIndex(r => r.username === username);
    if (reviewIndex === -1) return res.status(404).send("Review not found for this user.");
  
    // Remove the review from the book's reviews array
    book.reviews.splice(reviewIndex, 1);
    res.send("Review deleted successfully.");
  });

module.exports = router;
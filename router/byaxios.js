const express = require('express');
const axios = require('axios');

const router = express.Router();

const bookslist = [
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 10.99,
    "isbn": "9780743273565"
  },
  {
    "id": 2,
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "price": 8.99,
    "isbn": "9780061120084"
  },
  {
    "id": 3,
    "title": "1984",
    "author": "George Orwell",
    "price": 9.99,
    "isbn": "9780451524936"
  },
  {
    "id": 4,
    "title": "1984",
    "author": "George Orwell",
    "price": 9.99,
    "isbn": "9780451524936"
  }
];

const bookreview = [
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 10.99,
    "isbn": "9780743273565",
    "review": 'good'
  },
  {
    "id": 2,
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "price": 8.99,
    "isbn": "9780061120084",
    "review": 'Excellent'
  },
  {
    "id": 3,
    "title": "1984",
    "author": "George Orwell",
    "price": 9.99,
    "isbn": "9780451524936",
    "review": 'very good'
  },
  {
    "id": 4,
    "title": "1984",
    "author": "George Orwell",
    "price": 9.99,
    "isbn": "9780451524936",
    "review": 'Bad'
  }
];

// Task 10: Get all books – Using async callback function
router.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/books');
    console.log("All Books:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching all books:", error.message);
    res.status(500).json({ message: "Error fetching all books" });
  }
});

// Task 11: Search by ISBN – Using Promises
router.get('/:isbn', (req, res) => {
  axios.get(`http://localhost:3000/books/${req.params.isbn}`)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.error("Error fetching book by ISBN:", error.message);
      res.status(500).json({ message: "Error fetching book by ISBN" });
    });
});

// Task 12: Search by Author
router.get('/author/:author', async (req, res) => {
  const rawAuthor = req.params.author;
  const authorParam = rawAuthor.replace(/\s+/g, "").trim().toLowerCase();
  console.log('Raw Author Param:', rawAuthor);
  console.log('Normalized Author Param:', authorParam);

  const booksByAuthor = bookslist.filter(
    (book) => book.author.replace(/\s+/g, "").trim().toLowerCase() === authorParam
  );
  console.log('Books Found:', booksByAuthor);

  if (booksByAuthor.length > 0) {
    res.json(booksByAuthor);
  } else {
    res.status(404).json({ message: 'No books found for the given author' });
  }
});

// Task 13: Search by Title
router.get('/title/:title', async (req, res) => {
  const rawTitle = req.params.title;
  const titleParam = rawTitle.replace(/\s+/g, "").trim().toLowerCase();
  console.log('Raw Title Param:', rawTitle);
  console.log('Normalized Title Param:', titleParam);

  const booksByTitle = bookslist.filter(
    (book) => book.title.replace(/\s+/g, "").trim().toLowerCase() === titleParam
  );
  console.log('Books Found:', booksByTitle);

  if (booksByTitle.length > 0) {
    res.json(booksByTitle);
  } else {
    res.status(404).json({ message: 'No books found for the given title' });
  }
});

module.exports = router;
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
]

const bookreview = [
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 10.99,
    "isbn": "9780743273565",
    "review":'good'
  },
  {
    "id": 2,
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "price": 8.99,
    "isbn": "9780061120084",
    "review":'Excellent'
  },
  {
    "id": 3,
    "title": "1984",
    "author": "George Orwell",
    "price": 9.99,
    "isbn": "9780451524936",
    "review":'very good'
    
  },
  {
    "id": 4,
    "title": "1984",
    "author": "George Orwell",
    "price": 9.99,
    "isbn": "9780451524936",
    "review":'Bad'
  }
]



router.get('/', (req, res) => {
  return res.json(bookslist);
});

router.get('/bookreview', (req, res) => {
  return res.json(bookreview);
});




router.get('/isbn/:isbn', async (req, res) => {
  const findbyisbn = await bookslist.filter((book) => book.isbn === req.query.isbn);
  if (findbyisbn.length > 0) {
    return res.json(findbyisbn);
  } else {
    return res.status(404).json({ message: 'No books found for the given Isbn' });
  }
});

router.get('/author/:author', async (req, res) => {
  const filteredBooks = await bookslist.filter(b => b.author.trim().toLowerCase() === req.query.author.trim().toLowerCase());
  if (filteredBooks.length > 0) {
    return res.json(filteredBooks);
  } else {
    return res.status(404).json({ message: 'No books found for the given author' });
  }
});

router.get('/title/:title', async (req, res) => {
  const filteredBooks = await bookslist.filter(b => b.title.trim().toLowerCase() === req.query.title.trim().toLowerCase());
  if (filteredBooks.length > 0) {
    return res.json(filteredBooks);
  } else {
    return res.status(404).json({ message: 'No books found for the given Title' });
  }
});

module.exports = router;
let Book = require('../models/book');
let Author = require('../models/author');
let Genre = require('../models/genre');

function getAuthor(family_name, first_name) {
  return Author.findOne({family_name: family_name, first_name: first_name});
}

function sanitizeInput(res, input) {
  // Input validation: Ensure input is a string
  if (typeof input !== 'string') {
    return res.status(400).send('Invalid username format');
  }

  // Sanitize input: Prevent NoSQL injection
  return input.replace(/[^\w\s]/gi, ''); // Remove non-alphanumeric characters
}

function getGenre(res, name) {
  return Genre.find({name: sanitizeInput(res, name)});
}

exports.new_book = async (res, family_name, first_name, genre_name, title) => {
  let author = await getAuthor(family_name, first_name).exec();
  let genre = await getGenre(res, genre_name).exec();
  let book = Book({
    title: title,
    summary: 'Demo Summary to be updated later',
    author: author,
    isbn: 'ISBN2022',
    genre: genre
  });
  await book.save();
  res.send('Created new book : ' + book);
}

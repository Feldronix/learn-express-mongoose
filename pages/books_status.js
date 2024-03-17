let BookInstance = require('../models/bookinstance');
let Book = require('../models/book');

function get_available_books() {
  return BookInstance.find({ status: 'Available'}, 'book status').populate('book');
}

exports.show_all_books_status = async (res) => {
  try {
    let available_books = await get_available_books().exec();
    console.log(available_books);
    res.send(available_books.map(function(b) {
      return Book(b.book).title + ' : ' + b.status;
    }));
  }
  catch(err) {
    res.send('Could not get available books');
  }
}
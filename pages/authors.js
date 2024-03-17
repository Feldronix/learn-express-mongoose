let Author = require('../models/author');

function get_author_list () {
  return Author.find({});
};

exports.show_all_authors = async (res) => {
  try {
    let authors = await get_author_list().exec();
    res.send(authors.map(function(a) {
      return a.name + ' | ' + a.lifespan;
    }));
  } 
  catch (err) {
    res.send('No authors found');
  }
}

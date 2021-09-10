const express = require('express');
const Author = require('../models/author');
const router = express.Router();

router.get('/', async (req, res) => {
  let searchOptions = {};
  if (req.query.name) {
    searchOptions.name = new RegExp(req.query.name, 'i');
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render('author/index', { authors, searchOptions: req.query });
  } catch {
    res.redirect('/');
  }
});
router.get('/new', (req, res) => {
  res.render('author/new', { author: new Author() });
});
router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const result = await author.save();
    //res.redirect(`authors/${author.id}`);
    res.redirect('authors');
  } catch (ex) {
    res.render('author/new', {
      author: author,
      error: 'Error creating new Author',
    });
  }
});

module.exports = router;

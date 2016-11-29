const express = require('express')
const router = express.Router();
const validate = require('../helpers/validator');
const base62 = require('../helpers/base62');
const urls = require('../models/url');

base62.setCharSet(process.env.BASE62_CHARSET);

router.get('/', (req, res) => res.send('API documentation'));

router.get('/:id', (req, res) => {
  const id = base62.decode(req.params.id);

  urls.find(id)
  .then(doc => res.redirect(301, doc.url))
  .catch(() => res.send({
    error: true,
    message: 'Could not find document'
  }));
});

router.get('/shorten/:url(*)', (req, res) => {
  // OMG, it's so dirty, but req.params.url won't catch full URL
  // if it includes query strings
  // const url = req.params.url;
  const url = req.originalUrl.replace(/^\/shorten\//, '');

  validate.url(url)
  .then(url => urls.create(url))
  .then(id => base62.encode(id))
  .then(base62 => {
    return {
      original: url,
      short: process.env.API_URL + '/' + base62,
      statistics: process.env.API_URL + '/stats/' + base62
    }
  })
  .then(urls => res.send(urls))
  .catch(err => res.send({
    error: true,
    message: err
  }));
});

module.exports = router;

'use strict';

/* eslint-disable no-console */
require('dotenv').config({ silent: process.env.NODE_ENV === 'production' });

const path = require('path');
const express = require('express');
const cors = require('cors');
const db = require('./db');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/urlshortener';

if (app.get('env') === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(routes);

db.connect(uri)
  .then(() => {
    app.listen(port, () => console.log('Server listening on port %s', port));
  })
  .catch(err => console.error(err.name, err.message));

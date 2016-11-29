require('dotenv').config({ silent: process.env.NODE_ENV === 'production' });
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');
const port = process.env.PORT || 3000;
const uri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/urlshortener';

if (app.get('env') === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

app.use(cors());
app.use(require('./routes'));

db.connect(uri)
.then(() => {
  app.listen(port, () => console.log('Server listening on port %s', port));
})
.catch(err => console.error(err.name + ': ' + err.message));

const MongoClient = require('mongodb').MongoClient;

const state = {
  db: null,
};

module.exports.connect = uri => (
  new Promise((resolve, reject) => {
    if (state.db) {
      resolve(state.db);
    }
    MongoClient.connect(uri, (err, db) => {
      if (err) {
        reject(err);
      }
      state.db = db;
      resolve(state.db);
    });
  })
);

module.exports.get = () => state.db;

module.exports.collection = (col) => {
  if (state.db) {
    return state.db.collection(col);
  }
};

module.exports.close = (done) => {
  if (state.db) {
    state.db.close((err, result) => {
      state.db = null;
      done(err);
    });
  }
};

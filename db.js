const MongoClient = require('mongodb').MongoClient;

let state = {
  db: null
}

module.exports.connect = function(uri) {
  return new Promise((resolve, reject) => {
    if (state.db) {
      resolve(state.db);
    }
    MongoClient.connect(uri, (err, db) => {
      if (err) {
        reject(err);
      }
      state.db = db;
      resolve(state.db);
    })
  });
}

module.exports.get = function() {
  return state.db;
}

module.exports.collection = function(col) {
  if (state.db) {
    return state.db.collection(col);
  }
}

module.exports.close = function(done) {
  if (state.db) {
    state.db.close((err, result) => {
      state.db = null;
      done(err);
    });
  }
}

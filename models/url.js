const db = require('../db');

module.exports.find = function(id) {
  const col = db.collection('urls');

  return col.find({id: id})
    .limit(1)
    .next();
}

module.exports.create = function(url, callback) {
  const col = db.collection('urls');

  return getNextSequence('urlid')
  .then(next => {
    return col.insertOne({
      id: next,
      url: url,
      added: new Date()
    })
    .then(r => {
      if (r.insertedCount === 1) {
        return next;
      }
    });
  });
}

function getNextSequence(name) {
  const col = db.collection('counters');

  return col.findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    {
      upsert: true,
      projection: { seq: 1 }
    }
  )
  .then(res => res.value.seq);
}

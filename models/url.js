const db = require('../db');

function getNextSequence(name) {
  const col = db.collection('counters');

  return col.findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    {
      upsert: true,
      projection: { seq: 1 },
    }
  )
  .then(res => res.value.seq);
}

module.exports.find = function find(id) {
  const col = db.collection('urls');

  return col.find({ id })
    .limit(1)
    .next();
};

module.exports.create = function create(url) {
  const col = db.collection('urls');

  return getNextSequence('urlid')
  .then(nextId => (
    col.insertOne({
      id: nextId,
      url,
      added: new Date(),
    }))
    .then((res) => {
      if (res.insertedCount === 1) {
        return nextId;
      }
    })
  );
};

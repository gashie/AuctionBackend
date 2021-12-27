const pool = require('../config/db');
let auctiondb = {};

auctiondb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM session WHERE deletedAt IS NULL', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

auctiondb.create = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO session SET ?', [postData], (err, results) => {
      if (err) {
        return reject(err);
      }

      return resolve(results);
    });
  });
};


module.exports = auctiondb
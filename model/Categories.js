const pool = require('../config/db');
let auctiondb = {};

auctiondb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM categories WHERE deletedAt IS NULL', (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

auctiondb.create = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO categories SET ?', [postData], (err, results) => {
      if (err) {
        return reject(err);
      }

      return resolve(results);
    });
  });
};

auctiondb.Find = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM categories WHERE id = ? AND deletedAt IS NULL";
    pool.query(sql, [id], function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results[0]);
    });
  });
};

auctiondb.update = (postdata, id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        "UPDATE categories SET ? WHERE id = ?",
        [postdata, id],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          return resolve(results);
        }
      );
    });
  };
module.exports = auctiondb
const pool = require('../config/db');
let auctiondb = {};

auctiondb.all = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM bid WHERE auctionID  = ?";
    pool.query(sql, [id], function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

auctiondb.create = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO bid SET ?', [postData], (err, results) => {
      if (err) {
        return reject(err);
      }

      return resolve(results);
    });
  });
};

auctiondb.Find = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM bid WHERE auctionID  = ?";
      pool.query(sql, [id], function (error, results, fields) {
        if (error) {
          return reject(error);
        }
        return resolve(results[0]);
      });
    });
  };

  auctiondb.SumBid = (id,user) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT SUM(bidAmount)  AS totalamount FROM bid WHERE auctionID = ?";
      pool.query(sql, [id,user], function (error, results, fields) {
        if (error) {
          return reject(error);
        }
        return resolve(results[0]);
      });
    });
  };

  auctiondb.mySumBid = (id,user) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT SUM(bidAmount)  AS totalamount FROM bid WHERE auctionID = ? AND bidderID = ?";
      pool.query(sql, [id,user], function (error, results, fields) {
        if (error) {
          return reject(error);
        }
        return resolve(results[0]);
      });
    });
  };
  auctiondb.GetLatestBid = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT bidAmount FROM bid  WHERE auctionID = ? ORDER BY id DESC LIMIT 1";
      pool.query(sql, [id], function (error, results, fields) {
        if (error) {
          return reject(error);
        }
        return resolve(results[0]);
      });
    });
  };

  auctiondb.FindListing = (id) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM listings WHERE id = ? AND closeDate > NOW() AND deletedAt IS NULL AND status = 1";
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
          "UPDATE bid SET ? WHERE id = ?",
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
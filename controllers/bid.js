const Bid = require("../model/Bid");
const Auction = require("../model/Auction");
const camelcaseKeys = require("camelcase-keys");
const asynHandler = require("../middleware/async");

exports.CreateBid = asynHandler(async (req, res, next) => {
  let dbresult = await Bid.FindListing(req.body.auctionID);
  const newData = {
    bidderID: req.body.bidderID,
    auctionID: req.body.auctionID,
    bidAmount: req.body.bidAmount,
    auctionID: req.body.auctionID,
    dateTimeOfBid: req.body.dateTimeOfBid,
    bidType: req.body.bidType,
  };

  //check if auction is within time
  if (!dbresult) {
    return res.status(200).json({
      Status: 0,
      Data: [],
      Message: `This Bid is closed`,
    });
  }

  let minBid = dbresult.minBid;
  let maxBid = dbresult.highBidAmount;
  let amount = req.body.bidAmount;

  if (amount >= minBid || amount >= maxBid) {
    //check if bid amount is equal to or more or is equal to or more than high bid amount for auction

    //sum current bids and make sure bid amount is not less than that
    let sumresult = await Bid.SumBid(req.body.auctionID);
    let sumamount = sumresult.totalamount;
    if (amount <= sumamount) {
      res
        .status(200)
        .json({ Status: 0, Message: "Please increase the amount to bid" });
    } else {
      //check if amount is greater than maxbid

      if (amount + sumamount >= maxBid) {
        //save ,update and close auction

        console.log("higher pls");
        const closingata = {
          status: 3,
          updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        };

        let result = await Bid.create(newData); //save bid
        if (result.affectedRows === 1) {
          let result = await Auction.update(closingata, req.body.auctionID); //close bid
          res.status(200).json({
            Status: 1,
            Message: `Record Created Successfully`,
          });
        } else {
          res.status(500).json({ Status: 0, Message: "Error Saving Record" });
        }
      } else {
        //save and still show auction

        let result = await Bid.create(newData);
        if (result.affectedRows === 1) {
          res.status(200).json({
            Status: 1,
            Message: `Record Created Successfully`,
          });
        } else {
          res.status(500).json({ Status: 0, Message: "Error Saving Record" });
        }
      }
    }
  } else {
    res
      .status(200)
      .json({ Status: 0, Message: "Please increase the amount to bid" });
  }
});

exports.ViewBid = asynHandler(async (req, res, next) => {
  let dbresult = await Bid.all();
  if (dbresult.length == 0) {
    return res.status(200).json({
      Status: 0,
      Data: [],
      Message: `No record found`,
    });
  }

  res.json({
    Status: 1,
    Message: "Record Found",
    Data: camelcaseKeys(dbresult, { deep: true }),
  });
});

exports.SingleBid = asynHandler(async (req, res, next) => {
  let id = req.body.id;
  let dbresult = await Bid.Find(id);
  if (!dbresult) {
    return res.status(200).json({
      Status: 0,
      Data: [],
      Message: `No record found`,
    });
  }

  res.json({
    Status: 1,
    Message: "Record Found",
    Data: camelcaseKeys(dbresult, { deep: true }),
  });
});

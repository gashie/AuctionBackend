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
    bidType: req.body.remember == true ? 1 : 0,
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
    let sumresult = await Bid.mySumBid(req.body.auctionID,req.body.bidderID);
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
    
       
        let result = await Bid.create(newData);
            //save and still show auction or still below maxbid
            let autobid = dbresult.autoBid
            let autobiduser = dbresult.autoBidUser
    
            if(autobid){
              console.log(dbresult.autoBid);
              newData.bidderID = autobiduser
              newData.bidType = 1
              newData.bidAmount= req.body.bidAmount +1
              let pushauto = await Bid.create(newData);
            }
        if (result.affectedRows === 1) {
          if(req.body.remember){
            const setAutoBid = {
              autoBid: 1,
              autoBidUser: req.body.bidderID,
              updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
            };
  
            let autobidresult = await Auction.update(setAutoBid, req.body.auctionID); //set auto bid update on listings
          }
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

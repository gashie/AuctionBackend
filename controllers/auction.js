const Auction = require("../model/Auction");
const Categories = require("../model/Categories");
const camelcaseKeys = require("camelcase-keys");
const asynHandler = require("../middleware/async");

exports.ViewAuction = asynHandler(async (req, res, next) => {
  let dbresult = await Auction.all();
  if (dbresult.length == 0) {
    return res.status(200).json({
      Status: 0,
      Data: [],
      Message: `No record found`,
    });
  }

  let resarray = [];
  for (const iterator of dbresult) {
    let { title } = await Categories.Find(iterator.catID);
    const details = Object.assign(iterator, {
      catname: title,
    });
    resarray.push(details);
  }

  res.json({
    Status: 1,
    Message: "Record Found",
    Data: camelcaseKeys(resarray, { deep: true }),
  });
});

exports.UpdateAuction = asynHandler(async (req, res, next) => {
  let id = req.body.id;

  const newData = {
    // appId: req.body.appId,
    photo: req.body.photo,
    catID: req.body.catID,
    title: req.body.title,
    description: req.body.description,
    closeDate: req.body.closeDate,
    minBid: req.body.minBid,
    highBidAmount: req.body.highBidAmount,
    updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
  };
  if (!id) {
    return res.status(400).json({
      Status: 0,
      Message: `Please provide appId`,
    });
  }
  let result = await Auction.update(newData, id);

  if (result.affectedRows === 1) {
    res.status(200).json({
      Status: 1,
      Message: `Record Updated`,
    });
  } else {
    res.status(500).json({ Status: 0, Message: "Error Updating Record" });
  }
});

exports.RemoveAuction = asynHandler(async (req, res, next) => {
  let id = req.body.id;

  const newData = {
    status: 0,
    deletedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
  };
  if (!id) {
    return res.status(400).json({
      Status: 0,
      Message: `Please provide id`,
    });
  }
  let result = await Auction.update(newData, id);

  if (result.affectedRows === 1) {
    res.status(200).json({
      Status: 1,
      Message: `Record Deleted`,
    });
  } else {
    res.status(500).json({ Status: 0, Message: "Error Removing Record" });
  }
});

exports.SingleAuction = asynHandler(async (req, res, next) => {
  let id = req.body.id;
  let dbresult = await Auction.Find(id);
  if (!dbresult) {
    return res.status(200).json({
      Status: 0,
      Data: [],
      Message: `No record found`,
    });
  }

  let { title } = await Categories.Find(dbresult.catID);
  dbresult.catname = title;
  dbresult;
  res.json({
    Status: 1,
    Message: "Record Found",
    Data: camelcaseKeys(dbresult, { deep: true }),
  });
});

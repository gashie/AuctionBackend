const Categories = require("../model/Categories");
const camelcaseKeys = require("camelcase-keys");
const asynHandler = require("../middleware/async");

exports.CreateCategory = asynHandler(async (req, res, next) => {
  const newData = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  };

  let result = await Categories.create(newData);
  if (result.affectedRows === 1) {
    res.status(200).json({
      Status: 1,
      Message: `Record Created Successfully`,
    });
  } else {
    res.status(500).json({ Status: 0, Message: "Error Saving Record" });
  }
});

exports.ViewCategories = asynHandler(async (req, res, next) => {
  let dbresult = await Categories.all();
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

exports.UpdateCategories = asynHandler(async (req, res, next) => {
  let id = req.body.id;

  const newData = {
    title: req.body.title,
    description: req.body.description,
    updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
  };
  if (!id) {
    return res.status(400).json({
      Status: 0,
      Message: `Please provide id`,
    });
  }
  let result = await Categories.update(newData, id);

  if (result.affectedRows === 1) {
    res.status(200).json({
      Status: 1,
      Message: `Record Updated`,
    });
  } else {
    res.status(500).json({ Status: 0, Message: "Error Updating Record" });
  }
});

exports.RemoveCategory = asynHandler(async (req, res, next) => {
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
  let result = await Categories.update(newData, id);

  if (result.affectedRows === 1) {
    res.status(200).json({
      Status: 1,
      Message: `Record Deleted`,
    });
  } else {
    res.status(500).json({ Status: 0, Message: "Error Removing Record" });
  }
});


exports.SingleCategory = asynHandler(async (req, res, next) => {
  let id = req.body.id;
  let dbresult = await Categories.Find(id);
  if (!dbresult) {
    return res.status(200).json({
      Status: 0,
      Data: [],
      Message: `No record found`,
    });
  }


dbresult
  res.json({
    Status: 1,
    Message: "Record Found",
    Data: camelcaseKeys(dbresult, { deep: true }),
  });
});

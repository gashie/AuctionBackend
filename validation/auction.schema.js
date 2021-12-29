const Joi = require("@hapi/joi");

const schema = {
  find: Joi.object({
    id: Joi.any().required().label('ID'),

  }),
  createcategory: Joi.object({
    title: Joi.string().label("title"),
  }),
  updatecategory: Joi.object({
    id: Joi.number().required().label('ID'),
    title: Joi.string().label("title"),
    description: Joi.any().label("Middle Name"),
  }),
  updatelisting: Joi.object({
    id: Joi.number().required().label('ID'),
    catID: Joi.number().required().label('Category ID'),
    title: Joi.string().label("title"),
    description: Joi.any().label("Description"),
    photo: Joi.any().label("Photo"),
    openDate: Joi.any().label("Open Date"),
    closeDate: Joi.any().label("Close Date"),
    minBid: Joi.number().label("Minimum Bid"),
    highBidAmount: Joi.number().label("High Bid Bid"),

  })

};

module.exports = schema;
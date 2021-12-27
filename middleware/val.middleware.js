const {
  createcategory,
  updatecategory,
  find,
  updatelisting
   } = require('../validation/auction.schema');
   
   module.exports = {
 
      createcategoryVal: async (req, res, next) => {
        const options = {
          errors: {
            wrap: {
              label: "",
            },
          },
        };
        const value = await createcategory.validate(req.body, options);
        if (value.error) {
          res.status(400).json({
            Status: 0,
            Message: value.error.details[0].message,
          });
        } else {
          next();
        }
      },
      updatecategoryVal: async (req, res, next) => {
        const options = {
          errors: {
            wrap: {
              label: "",
            },
          },
        };
        const value = await updatecategory.validate(req.body, options);
        if (value.error) {
          res.status(400).json({
            Status: 0,
            Message: value.error.details[0].message,
          });
        } else {
          next();
        }
      },
      singleRecordVal: async (req, res, next) => {
        const options = {
          errors: {
            wrap: {
              label: "",
            },
          },
        };
        const value = await find.validate(req.body, options);
        if (value.error) {
          res.status(400).json({
            Status: 0,
            Message: value.error.details[0].message,
          });
        } else {
          next();
        }
      },
      updateListingVal: async (req, res, next) => {
        const options = {
          errors: {
            wrap: {
              label: "",
            },
          },
        };
        const value = await updatelisting.validate(req.body, options);
        if (value.error) {
          res.status(400).json({
            Status: 0,
            Message: value.error.details[0].message,
          });
        } else {
          next();
        }
      },
   
   
    
   };
   
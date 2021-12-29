const express = require("express");
//validation schema
const {
updatecategoryVal,
createcategoryVal,
singleRecordVal,
updateListingVal
  } = require("../middleware/val.middleware");

const router = express.Router();
// CATEGORIES SETUP
const {
CreateCategory,
ViewCategories,
SingleCategory,
UpdateCategories,
RemoveCategory
} = require("../controllers/categories");

// Listing SETUP
const {
    ViewAuction,
    SingleAuction,
    UpdateAuction,
    RemoveAuction
    } = require("../controllers/auction");

    // Bid SETUP
const {
 CreateBid
    } = require("../controllers/bid");

//routes for categories
router.route("/viewcategories").get(ViewCategories);
router.route("/singlecategory").get(singleRecordVal,SingleCategory);
router.route("/createcategory").post(createcategoryVal,CreateCategory);
router.route("/updatecategory").put(updatecategoryVal,UpdateCategories);
router.route("/delcategory").delete(singleRecordVal,RemoveCategory);

//routes for listings
router.route("/viewlisting").get(ViewAuction);
router.route("/singlelisting").post(singleRecordVal,SingleAuction);
router.route("/updatelisting").put(updateListingVal,UpdateAuction);
router.route("/dellisting").delete(singleRecordVal,RemoveAuction);

//routes for bid
router.route("/bid").post(CreateBid);


module.exports = router;

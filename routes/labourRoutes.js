const express = require("express");
const {
  addLabour,
  editLabourDetails,
  getAllLabours,
  deleteLabour
} = require("../controllers/labourCtrl");

//router object
const router = express.Router();

//routes
router.post("/add-labour", addLabour);

router.post("/edit-labour", editLabourDetails);

router.post("/delete-labour", deleteLabour);

router.get("/getAll", getAllLabours);

module.exports = router;

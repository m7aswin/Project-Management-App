const express = require("express");
const {
  addMaterial,
  getAllMaterials,
  editMaterialDetails,
  deleteMaterial,
} = require("../controllers/materialCtrl");

//router object
const router = express.Router();

//routes
router.post("/add-material", addMaterial);

router.post("/edit-material", editMaterialDetails);

router.post("/delete-material", deleteMaterial);

router.get("/getAll", getAllMaterials);

module.exports = router;

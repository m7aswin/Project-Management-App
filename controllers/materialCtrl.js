const materialModel = require("../models/materialModel");
const getAllMaterials = async (req, res) => {
  try {
    const materials = await materialModel.find();
    res.status(200).json(materials);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteMaterial = async (req, res) => {
  try {
    await materialModel.findOneAndDelete({ materialId: req.body.materialId });
    res.status(200).send("Material Deleted!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const editMaterialDetails = async (req, res) => {
  try {
    await materialModel.findOneAndUpdate(
      { materialId: req.body.materialId },
      req.body
    );
    res.status(200).send("Edit SUccessfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addMaterial = async (req, res) => {
  try {
    const newMaterial = new materialModel(req.body);
    await newMaterial.save();
    res.status(201).send("Material Added!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllMaterials,
  addMaterial,
  editMaterialDetails,
  deleteMaterial,
};

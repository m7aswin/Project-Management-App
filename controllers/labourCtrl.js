const labourModel = require("../models/labourModel");
const getAllLabours = async (req, res) => {
  try {
    const labours = await labourModel.find();
    res.status(200).json(labours);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteLabour = async (req, res) => {
  try {
    await labourModel.findOneAndDelete({ _id: req.body._id });
    res.status(200).send("labour details deleted sucessfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const editLabourDetails = async (req, res) => {
  try {
    await labourModel.findOneAndUpdate(
      { _id: req.body._id },
      req.body
    );
    res.status(200).send("Labour details Edited Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addLabour = async (req, res) => {
  try {
    const newMaterial = new labourModel(req.body);
    await newMaterial.save();
    res.status(201).send("Labour details Added!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
getAllLabours,
  addLabour,
  editLabourDetails,
  deleteLabour,
};

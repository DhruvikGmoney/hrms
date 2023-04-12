const designationModel = require("../Models/DesignationModel");

module.exports = {
  addDesignation: async (req, res) => {
    const { designation_name, description, is_verified, is_active, modifyed_by } =
      req.body;

    const designation = await designationModel.findOne({ email: email });

    if (designation) {
      return res.status(400).json({ status: true, message: "Designation already exists" });
    } else {
      const designationData = new designationModel({
        designation_name,
        description,
        is_verified,
        is_active,
        modifyed_by,

      });
      designationData
        .save()
        .then((data) => {
          return res
            .status(201)
            .json({ status: true, message: "Designation Created Successfully", data });
        })
        .catch((error) => {
          return res.status(400).json({ message: error.message, error: error });
        });
    }
  },
  getAllDesignation: async (req, res) => {
    try {

      const allDesignation = await designationModel.find()
      if (allDesignation.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `Designation Not Found In Database` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Designation Get Successfully", allDesignation });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getDesignationById: async (req, res) => {
    try {

      const { designation_id } = req.params
      const designation = await designationModel.findById({ _id: designation_id });
      if (designation == null) {
        return res
          .status(404)
          .json({ status: false, message: `Designation Not Found With ID :- ${designation_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Designation Get Successfully", designation });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateDesignation: async (req, res) => {
    try {

      const { designation_id } = req.params
      const designation = await designationModel.findByIdAndUpdate({ _id: designation_id }, req.body, { new: true });
      if (designation == null) {
        return res
          .status(404)
          .json({ status: false, message: `Designation Not Found With ID :- ${designation_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Designation Updated Successfully", designation });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateDesignationStatus: async (req, res) => {
    try {

      const { designation_id, status } = req.params
      const designation = await designationModel.findByIdAndUpdate(designation_id,
        { $set: { is_active: status } },
        { new: true });
      if (designation == null) {
        return res
          .status(404)
          .json({ status: false, message: `Designation Not Found With ID :- ${designation_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Designation Status Updated Successfully", designation });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  deleteDesignation: async (req, res) => {
    try {

      const { designation_id } = req.params
      const designation = await designationModel.findByIdAndDelete({ _id: designation_id });
      if (designation == null) {
        return res
          .status(404)
          .json({ status: false, message: `Designation Not Found With ID :- ${designation_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Designation Deleted Successfully", designation });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
};

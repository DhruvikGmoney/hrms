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

      const allDesignation = await designationModel.find()//.populate("posts");

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
      const allDesignation = await designationModel.findById({ _id: designation_id });
      return res
        .status(200)
        .json({ status: true, message: "Designation Get Successfully", allDesignation });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateDesignation: async (req, res) => {
    try {

      const { designation_id } = req.params
      const allDesignation = await designationModel.updateOne({ designation_id: designation_id }, req.body);
      return res
        .status(200)
        .json({ status: true, message: "Designation Updated Successfully", allDesignation });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
    // return designationModel.findOneAndUpdate(designation_id, body);
  },
  updateDesignationStatus: async (req, res) => {
    try {

      const { designation_id, status } = req.params
      const allDesignation = await designationModel.findByIdAndUpdate(designation_id,
        { $set: { is_active: status } },
        { upsert: true, new: true });
      return res
        .status(200)
        .json({ status: true, message: "Designation Status Updated Successfully", allDesignation });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
    // return attendanceModel.findOneAndUpdate(designation_id, body);
  },
  deleteDesignation: async (req, res) => {
    try {

      const { designation_id } = req.params
      const allDesignation = await designationModel.deleteOne({ designation_id: designation_id });
      return res
        .status(200)
        .json({ status: true, message: "Designation Deleted Successfully", allDesignation });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
    // return airlineModel.findOneAndDelete(airline_id);
  },
};

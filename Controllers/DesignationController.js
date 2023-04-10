const designationModel = require("../Models/DesignationModel");

module.exports = {
  addDesignation: async (req, res) => {
    const { employee_id, is_verified, is_active, modifyed_by, checke_in_out } =
      req.body;

    const designation = await designationModel.findOne({ email: email });

    if (designation) {
      return res.status(400).json({ message: "Designation already exists" });
    } else {
      const designationData = new designationModel({
        employee_id,
        is_verified,
        is_active,
        modifyed_by,
        checke_in_out,
      });
      designationData
        .save()
        .then((data) => {
          return res
            .status(201)
            .json({ message: "Designation created Successfully", data });
        })
        .catch((error) => {
          return res.status(400).json({ message: error.message, error: error });
        });
    }
  },
  getAllDesignation: () => {
    return designationModel.find();
  },
  getDesignationById: (designation_id) => {
    return designationModel.findOne({ designation_id: designation_id });
    // return designationModel.findById(designation_id);
  },
  updateDesignation: (designation_id, body) => {
    return designationModel.updateOne({ designation_id: designation_id }, body);
    // return designationModel.findOneAndUpdate(designation_id, body);
  },
  deleteDesignation: (designation_id) => {
    return designationModel.deleteOne({ designation_id: designation_id });
    // return designationModel.findOneAndDelete(designation_id);
  },
};

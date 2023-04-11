const departmentModel = require("../Models/DepartmentModel");

module.exports = {
  addDepartment: async (req, res) => {
    const { manager_id, description, is_verified, is_active, modifyed_by } =
      req.body;

    const department = await departmentModel.findOne({ email: email });

    if (department) {
      return res.status(400).json({ status: true, message: "Department already exists" });
    } else {
      const departmentData = new departmentModel({
        manager_id,
        description,
        is_verified,
        is_active,
        modifyed_by,
      });
      departmentData
        .save()
        .then((data) => {
          return res
            .status(201)
            .json({ status: true, message: "Department Created Successfully", data });
        })
        .catch((error) => {
          return res.status(400).json({ message: error.message, error: error });
        });
    }
  },
  getAllDepartment: async (req, res) => {
    try {

      const allDepartment = await departmentModel.find()//.populate("posts");

      return res
        .status(200)
        .json({ status: true, message: "Department Get Successfully", allDepartment });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getDepartmentById: async (req, res) => {
    try {

      const { department_id } = req.params
      const allDepartment = await departmentModel.findOne({ department_id: department_id });
      return res
        .status(200)
        .json({ status: true, message: "Department Get Successfully", allDepartment });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
    // return departmentModel.findById(department_id);
  },
  updateDepartment: async (req, res) => {
    try {

      const { department_id } = req.params
      const allDepartment = await departmentModel.updateOne({ department_id: department_id }, req.body);
      return res
        .status(200)
        .json({ status: true, message: "Department Updated Successfully", allDepartment });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
    // return departmentModel.findOneAndUpdate(department_id, body);
  },
  updateDepartmentStatus: async (req, res) => {
    try {

      const { department_id, status } = req.params
      const allDepartment = await departmentModel.findByIdAndUpdate(department_id,
        { $set: { is_active: status } },
        { upsert: true, new: true });
      return res
        .status(200)
        .json({ status: true, message: "Department Status Updated Successfully", allDepartment });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
    // return attendanceModel.findOneAndUpdate(department_id, body);
  },
  deleteDepartment: async (req, res) => {
    try {

      const { department_id } = req.params
      const allDepartment = await departmentModel.deleteOne({ department_id: department_id });
      return res
        .status(200)
        .json({ status: true, message: "Department Deleted Successfully", allDepartment });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
    // return airlineModel.findOneAndDelete(airline_id);
  },
};

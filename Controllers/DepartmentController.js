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
        .then((department) => {
          return res
            .status(201)
            .json({ status: true, message: "Department Created Successfully", department });
        })
        .catch((error) => {
          return res.status(400).json({ message: error.message, error: error });
        });
    }
  },
  getAllDepartment: async (req, res) => {
    try {

      const department = await departmentModel.find()
      if (department.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `Department Not Found In Database` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Department Get Successfully", department });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getDepartmentById: async (req, res) => {
    try {

      const { department_id } = req.params
      const department = await departmentModel.findById({ _id: department_id });
      if (department == null) {
        return res
          .status(404)
          .json({ status: false, message: `Department Not Found With ID :- ${department_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Department Get Successfully", department });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateDepartment: async (req, res) => {
    try {

      const { department_id } = req.params
      const department = await departmentModel.findByIdAndUpdate({ _id: department_id }, req.body, { new: true });
      if (department == null) {
        return res
          .status(404)
          .json({ status: false, message: `Department Not Found With ID :- ${department_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Department Updated Successfully", department });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateDepartmentStatus: async (req, res) => {
    try {

      const { department_id, status } = req.params
      const department = await departmentModel.findByIdAndUpdate(department_id,
        { $set: { is_active: status } },
        { new: true });
      if (department == null) {
        return res
          .status(404)
          .json({ status: false, message: `Department Not Found With ID :- ${department_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Department Status Updated Successfully", department });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  deleteDepartment: async (req, res) => {
    try {

      const { department_id } = req.params
      const department = await departmentModel.findByIdAndDelete({ _id: department_id });
      if (department == null) {
        return res
          .status(404)
          .json({ status: false, message: `Department Not Found With ID :- ${department_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Department Deleted Successfully", department });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
};

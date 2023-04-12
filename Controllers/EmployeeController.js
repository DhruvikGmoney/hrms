const employeeModel = require("../Models/EmployeeModel");

module.exports = {
  addEmployee: async (req, res) => {
    const { employee_id, is_verified, is_active, modifyed_by, checke_in_out } =
      req.body;

    const user = await employeeModel.findOne({ email: email });

    if (user) {
      return res.status(400).json({ message: "User already registered" });
    } else {
      const userData = new employeeModel({
        employee_id,
        is_verified,
        is_active,
        modifyed_by,
        checke_in_out,
      });
      userData
        .save()
        .then((data) => {
          return res
            .status(201)
            .json({ message: "User Created Successfully", data });
        })
        .catch((error) => {
          return res.status(400).json({ message: error.message, error: error });
        });
    }
  },
  getAllEmployee: async (req, res) => {
    try {

      const allEmployee = await employeeModel.find()
      if (allEmployee.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `Employee Not Found In Database` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Employee Get Successfully", allEmployee });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getEmployeeById: async (req, res) => {
    try {

      const { employee_id } = req.params
      const employee = await employeeModel.findById({ _id: employee_id });
      if (employee == null) {
        return res
          .status(404)
          .json({ status: false, message: `Employee Not Found With ID :- ${employee_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Employee Get Successfully", employee });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateEmployee: async (req, res) => {
    try {

      const { employee_id } = req.params
      const employee = await employeeModel.findByIdAndUpdate({ _id: employee_id }, req.body, { new: true });
      if (employee == null) {
        return res
          .status(404)
          .json({ status: false, message: `Employee Not Found With ID :- ${employee_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Employee Updated Successfully", employee });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateEmployeeStatus: async (req, res) => {
    try {

      const { employee_id, status } = req.params
      const employee = await employeeModel.findByIdAndUpdate(employee_id,
        { $set: { is_active: status } },
        { new: true });
      if (employee == null) {
        return res
          .status(404)
          .json({ status: false, message: `Employee Not Found With ID :- ${employee_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Employee Status Updated Successfully", employee });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  deleteEmployee: async (req, res) => {
    try {

      const { employee_id } = req.params
      const employee = await employeeModel.findByIdAndDelete({ _id: employee_id });
      if (employee == null) {
        return res
          .status(404)
          .json({ status: false, message: `Employee Not Found With ID :- ${employee_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Employee Deleted Successfully", employee });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
};

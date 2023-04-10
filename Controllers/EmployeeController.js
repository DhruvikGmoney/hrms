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

      const allEmployee = await employeeModel.find()//.populate("posts");

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
      const allEmployee = await employeeModel.findOne({ employee_id: employee_id });
      return res
        .status(200)
        .json({ status: true, message: "Employee Get Successfully", allEmployee });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
    // return employeeModel.findById(employee_id);
  },
  updateEmployee: async (req, res) => {
    try {

      const { employee_id } = req.params
      const allEmployee = await employeeModel.updateOne({ employee_id: employee_id }, req.body);
      return res
        .status(200)
        .json({ status: true, message: "Employee Updated Successfully", allEmployee });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
    // return employeeModel.findOneAndUpdate(employee_id, body);
  },
  deleteEmployee: async (req, res) => {
    try {

      const { employee_id } = req.params
      const allEmployee = await employeeModel.deleteOne({ employee_id: employee_id });
      return res
        .status(200)
        .json({ status: true, message: "Employee Deleted Successfully", allEmployee });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
    // return airlineModel.findOneAndDelete(airline_id);
  },
};

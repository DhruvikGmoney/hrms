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
            .json({ message: "User created Successfully", data });
        })
        .catch((error) => {
          return res.status(400).json({ message: error.message, error: error });
        });
    }
  },
  getAllEmployee: () => {
    return employeeModel.find();
  },
  getEmployeeById: (employee_id) => {
    return employeeModel.findOne({ employee_id: employee_id });
    // return employeeModel.findById(employee_id);
  },
  updateEmployee: (employee_id, data) => {
    return airlineModel.updateOne({ employee_id: employee_id }, body);
    // return employeeModel.findOneAndUpdate(employee_id, data);
  },
  deleteEmployee: (employee_id) => {
    return employeeModel.deleteOne({ employee_id: employee_id });
    // return employeeModel.findOneAndDelete(employee_id);
  },
};

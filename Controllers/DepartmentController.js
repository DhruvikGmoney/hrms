const departmentModel = require("../Models/DepartmentModel");

module.exports = {
  addDepartment: async (req, res) => {
    const { employee_id, is_verified, is_active, modifyed_by, checke_in_out } =
      req.body;

    const department = await departmentModel.findOne({ email: email });

    if (department) {
      return res.status(400).json({ message: "Department already exists" });
    } else {
      const departmentData = new departmentModel({
        employee_id,
        is_verified,
        is_active,
        modifyed_by,
        checke_in_out,
      });
      departmentData
        .save()
        .then((data) => {
          return res
            .status(201)
            .json({ message: "Department created Successfully", data });
        })
        .catch((error) => {
          return res.status(400).json({ message: error.message, error: error });
        });
    }
  },
  getAllDepartment: () => {
    return departmentModel.find();
  },
  getDepartmentById: (department_id) => {
    return departmentModel.findOne({ department_id: department_id });
    // return departmentModel.findById(department_id);
  },
  updateDepartment: (department_id, body) => {
    return departmentModel.findOneAndUpdate(department_id, body);
    // return airlineModel.updateOne({ department_id: department_id }, body);
  },
  deleteDepartment: (department_id) => {
    return departmentModel.findOneAndDelete(department_id);
    // return airlineModel.deleteOne({ department_id: department_id });
  },
};

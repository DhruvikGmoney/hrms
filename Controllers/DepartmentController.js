const departmentModel = require('../Models/DepartmentModel');

module.exports = {
    addDepartment: data => {
        return departmentModel.create(data);
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

    }
}
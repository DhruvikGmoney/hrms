const employeeModel = require('../Models/EmployeeModel');

module.exports = {
    addEmployee: data => {
        return employeeModel.create(data);
    },
    getAllEmployee: () => {
        return employeeModel.find();
    },
    getEmployeeById: employee_id => {
        return employeeModel.findOne({employee_id:employee_id});
        // return employeeModel.findById(employee_id);
    },
    updateEmployee: (employee_id, data) => {
        return airlineModel.updateOne({ employee_id: employee_id }, body);
        // return employeeModel.findOneAndUpdate(employee_id, data);
    },
    deleteEmployee: employee_id => {
        return employeeModel.deleteOne({ employee_id: employee_id });
        // return employeeModel.findOneAndDelete(employee_id);
    }
}
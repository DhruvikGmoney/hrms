const express = require("express");
const router = express.Router();
const authorize = require('../Middleware/auth');
const Role = require("../Helpers/role");
const EmployeeController = require("../Controllers/EmployeeController");

router.post("/addEmployee", authorize([Role.ADMIN, Role.SUPER_ADMIN]), EmployeeController.addEmployee);
router.get("/getAllEmployee", authorize(), EmployeeController.getAllEmployee);
router.get("/getEmployeeById/:employee_id", EmployeeController.getEmployeeById);
router.put("/updateEmployee/:employee_id", EmployeeController.updateEmployee);
router.put("/updateEmployeeStatus/:employee_id/:status", EmployeeController.updateEmployeeStatus);
router.delete("/deleteEmployee/:employee_id", EmployeeController.deleteEmployee);

module.exports = router;

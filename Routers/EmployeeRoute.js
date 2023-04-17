const express = require("express");
const router = express.Router();
const authorize = require('../Middleware/auth');
const Role = require("../Helpers/role");
const EmployeeController = require("../Controllers/EmployeeController");

router.post("/employee", authorize([Role.ADMIN, Role.SUPER_ADMIN]), EmployeeController.addEmployee);
router.get("/employee", authorize(), EmployeeController.getAllEmployee);
router.get("/employee/:employee_id", EmployeeController.getEmployeeById);
router.put("/employee/:employee_id", EmployeeController.updateEmployee);
router.put("/employee/:employee_id/:status", EmployeeController.updateEmployeeStatus);
router.delete("/employee/:employee_id", EmployeeController.deleteEmployee);

module.exports = router;

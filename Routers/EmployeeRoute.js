const express = require("express");
const router = express.Router();
const EmployeeController = require("../Controllers/EmployeeController");

router.post("/addEmployee", EmployeeController.addEmployee);
router.get("/getAllEmployee", EmployeeController.getAllEmployee);
router.get("/getEmployeeById/:employee_id", EmployeeController.getEmployeeById);
router.put("/updateEmployee/:employee_id", EmployeeController.updateEmployee);
router.put("/updateEmployeeStatus/:employee_id/:status", EmployeeController.updateEmployeeStatus);
router.delete("/deleteEmployee/:employee_id", EmployeeController.deleteEmployee);

module.exports = router;

const express = require("express");
const router = express.Router();
const employeeController = require("../Controllers/EmployeeController");

router.post("/addEmployee", employeeController.addEmployee);
router.get("/getAllEmployee", employeeController.getAllEmployee);
router.get("/getEmployeeById/:employee_id", employeeController.getEmployeeById); // Path Variables
router.put("/updateEmployee/:employee_id", employeeController.updateEmployee); // Path Variables
router.delete(
  "/deleteEmployee/:employee_id",
  employeeController.deleteEmployee
); // Path Variables

module.exports = router;

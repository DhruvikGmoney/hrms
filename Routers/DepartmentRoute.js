const express = require("express");
const router = express.Router();
const DepartmentController = require("../Controllers/DepartmentController");

router.post("/addDepartment", DepartmentController.addDepartment);
router.get("/getAllDepartment", DepartmentController.getAllDepartment);
router.get(
  "/getDepartmentById/:department_id",
  DepartmentController.getDepartmentById
); // Path Variables
router.put(
  "/updateDepartment/:department_id",
  DepartmentController.updateDepartment
); // Path Variables
router.delete(
  "/deleteDepartment?:department_id",
  DepartmentController.deleteDepartment
); // Query Params

module.exports = router;

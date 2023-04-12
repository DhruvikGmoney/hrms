const express = require("express");
const router = express.Router();
const authorize = require('../middleware/auth');
const Role = require("../Helpers/role");
const DepartmentController = require("../Controllers/DepartmentController");

router.post("/addDepartment", authorize([Role.ADMIN, Role.SUPER_ADMIN]), DepartmentController.addDepartment);
router.get("/getAllDepartment", authorize(), DepartmentController.getAllDepartment);
router.get("/getDepartmentById/:department_id", DepartmentController.getDepartmentById);
router.put("/updateDepartment/:department_id", DepartmentController.updateDepartment);
router.put("/updateDepartmentStatus/:department_id/:status", DepartmentController.updateDepartmentStatus);
router.delete("/deleteDepartment/:department_id", DepartmentController.deleteDepartment);

module.exports = router;

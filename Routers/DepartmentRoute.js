const express = require("express");
const router = express.Router();
const authorize = require('../Middleware/auth');
const Role = require("../Helpers/role");
const DepartmentController = require("../Controllers/DepartmentController");

router.post("/department", authorize([Role.ADMIN, Role.SUPER_ADMIN]), DepartmentController.addDepartment);
router.get("/department", authorize(), DepartmentController.getAllDepartment);
router.get("/department/:department_id", DepartmentController.getDepartmentById);
router.put("/department/:department_id", DepartmentController.updateDepartment);
router.put("/department/:department_id/:status", DepartmentController.updateDepartmentStatus);
router.delete("/department/:department_id", DepartmentController.deleteDepartment);

module.exports = router;

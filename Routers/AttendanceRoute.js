const express = require("express");
const router = express.Router();
const authorize = require('../middleware/auth');
const Role = require("../Helpers/role");
const AttendanceController = require("../Controllers/AttendanceController");

router.post("/checkeIn", authorize([Role.ADMIN, Role.SUPER_ADMIN]), AttendanceController.checkeIn);
router.post("/checkeOut", authorize([Role.ADMIN, Role.SUPER_ADMIN]), AttendanceController.checkeOut);
router.post("/addAttendance", authorize([Role.ADMIN, Role.SUPER_ADMIN]), AttendanceController.addAttendance);
router.get("/getAllAttendance", authorize(), AttendanceController.getAllAttendance);
router.get("/getAttendanceById/:attendance_id", AttendanceController.getAttendanceById);
router.put("/updateAttendance/:attendance_id", AttendanceController.updateAttendance);
router.patch("/updateAttendanceStatus/:attendance_id/:status", AttendanceController.updateAttendanceStatus);
router.delete("/deleteAttendance/:attendance_id", AttendanceController.deleteAttendance);

module.exports = router;

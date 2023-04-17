const express = require("express");
const router = express.Router();
const authorize = require('../Middleware/auth');
const Role = require("../Helpers/role");
const AttendanceController = require("../Controllers/AttendanceController");

router.route('/checke-in')
    .post(authorize([Role.ADMIN, Role.SUPER_ADMIN]), AttendanceController.checkeIn)

router.route('/checke-out')
    .post(authorize([Role.ADMIN, Role.SUPER_ADMIN]), AttendanceController.checkeOut)

router.route('/attendance')
    .post(authorize([Role.ADMIN, Role.SUPER_ADMIN]), AttendanceController.addAttendance)
    .get(authorize(), AttendanceController.getAllAttendance);

router.route('/attendance/:attendance_id')
    .get(AttendanceController.getAttendanceById)
    .put(AttendanceController.updateAttendance)
    .delete(AttendanceController.deleteAttendance);
module.exports = router;

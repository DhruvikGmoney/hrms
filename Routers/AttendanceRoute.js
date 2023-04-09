const express = require("express");
const router = express.Router();
// const authorize = require('../middleware/auth');
const AttendanceController = require("../Controllers/AttendanceController");
const Role = require("../Helpers/role");

// router.post('/addAttendance',authorize([Role.STAFF, Role.ADMIN]), AttendanceController.addAttendance);
// router.get('/getAllAttendance',authorize, AttendanceController.getAllAttendance);
// router.get('/getAttendanceById/:attendance_id',authorize, AttendanceController.getAttendanceById);
// router.put('/updateAttendance?:attendance_id',authorize, AttendanceController.updateAttendance);
// router.delete('/deleteAttendance/:attendance_id',authorize, AttendanceController.deleteAttendance);

router.post("/addAttendance", AttendanceController.addAttendance);
router.get("/getAllAttendance", AttendanceController.getAllAttendance);
router.get(
  "/getAttendanceById/:attendance_id",
  AttendanceController.getAttendanceById
);
router.put(
  "/updateAttendance?:attendance_id",
  AttendanceController.updateAttendance
);
router.delete(
  "/deleteAttendance/:attendance_id",
  AttendanceController.deleteAttendance
);

module.exports = router;

const express = require("express");
const router = express.Router();
const authorize = require('../middleware/auth');
const Role = require("../Helpers/role");
const LeaveController = require("../Controllers/LeaveController");

router.post("/addLeave", authorize([Role.ADMIN, Role.SUPER_ADMIN]), LeaveController.addLeave);
router.get("/getAllLeave", authorize(), LeaveController.getAllLeave);
router.get("/getLeaveById/:leave_id", LeaveController.getLeaveById);
router.put("/updateLeave/:leave_id", LeaveController.updateLeave);
router.put("/updateLeaveStatus/:leave_id/:status", LeaveController.updateLeaveStatus);
router.delete("/deleteLeave/:leave_id", LeaveController.deleteLeave);

module.exports = router;

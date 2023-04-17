const express = require("express");
const router = express.Router();
const authorize = require('../Middleware/auth');
const Role = require("../Helpers/role");
const LeaveController = require("../Controllers/LeaveController");

router.post("/leave", authorize([Role.ADMIN, Role.SUPER_ADMIN]), LeaveController.addLeave);
router.get("/leave", authorize(), LeaveController.getAllLeave);
router.get("/leave/:leave_id", LeaveController.getLeaveById);
router.get("/leave/:employee_id", LeaveController.getLeaveByUserId);
router.get("/leave/:status", LeaveController.getLeaveByStatus);
router.get("/leave/:start_date/:end_date", LeaveController.getLeaveByDate);
router.put("/leave/:leave_id", LeaveController.updateLeave);
router.put("/leave/:leave_id/:status", LeaveController.updateLeaveStatus);
router.delete("/leave/:leave_id", LeaveController.deleteLeave);

module.exports = router;

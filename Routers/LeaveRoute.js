const express = require("express");
const router = express.Router();
const LeaveController = require("../Controllers/LeaveController");

router.post("/addLeave", LeaveController.addLeave);
router.get("/getAllLeave", LeaveController.getAllLeave);
router.get("/getLeaveById?:leave_id", LeaveController.getLeaveById); // Query Params
router.put("/updateLeave/:leave_id", LeaveController.updateLeave); // Path Variables
router.delete("/deleteLeave/:leave_id", LeaveController.deleteLeave); // Path Variables

module.exports = router;

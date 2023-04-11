const express = require("express");
const router = express.Router();
const LeaveController = require("../Controllers/LeaveController");

router.post("/addLeave", LeaveController.addLeave);
router.get("/getAllLeave", LeaveController.getAllLeave);
router.get("/getLeaveById/:leave_id", LeaveController.getLeaveById);
router.put("/updateLeave/:leave_id", LeaveController.updateLeave);
router.put("/updateLeaveStatus/:leave_id/:status", LeaveController.updateLeaveStatus);
router.delete("/deleteLeave/:leave_id", LeaveController.deleteLeave);

module.exports = router;

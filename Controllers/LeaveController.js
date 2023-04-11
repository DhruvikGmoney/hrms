const leaveModel = require("../Models/LeaveModel");

module.exports = {
  addLeave: async (req, res) => {
    const { employee_id,
      type,
      start_date,
      end_date,
      description,
      status,
      is_verified,
      is_active,
      is_approved,
      approved_by,
      modifyed_by, } =
      req.body;

    const leaveData = new leaveModel({
      employee_id,
      type,
      start_date,
      end_date,
      description,
      status,
      is_verified,
      is_active,
      is_approved,
      approved_by,
      modifyed_by,
    });
    leaveData
      .save()
      .then((data) => {
        return res
          .status(201)
          .json({ status: true, message: "Leave Created Successfully", data });
      })
      .catch((error) => {
        return res.status(400).json({ message: error.message, error: error });
      });
  },
  getAllLeave: async (req, res) => {
    try {
      const allLeave = await leaveModel.find()//.populate("posts");

      return res
        .status(200)
        .json({ status: true, message: "Leave Get Successfully", allLeave });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getLeaveById: async (req, res) => {
    try {

      const { leave_id } = req.params
      const allLeave = await leaveModel.findOne({ leave_id: leave_id });
      return res
        .status(200)
        .json({ status: true, message: "Leave Get Successfully", allLeave });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
    // return leaveModel.findById(leave_id);
  },
  updateLeave: async (req, res) => {
    try {

      const { leave_id } = req.params
      const allLeave = await leaveModel.updateOne({ leave_id: leave_id }, req.body);
      return res
        .status(200)
        .json({ status: true, message: "Leave Updated Successfully", allLeave });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
    // return leaveModel.findOneAndUpdate(leave_id, body);
  },
  updateLeaveStatus: async (req, res) => {
    try {

      const { leave_id, status } = req.params
      const allLeave = await leaveModel.findByIdAndUpdate(leave_id,
        { $set: { is_active: status } },
        { upsert: true, new: true });
      return res
        .status(200)
        .json({ status: true, message: "Leave Status Updated Successfully", allLeave });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
    // return attendanceModel.findOneAndUpdate(leave_id, body);
  },
  deleteLeave: async (req, res) => {
    try {

      const { leave_id } = req.params
      const allLeave = await leaveModel.deleteOne({ leave_id: leave_id });
      return res
        .status(200)
        .json({ status: true, message: "Leave Deleted Successfully", allLeave });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
    // return airlineModel.findOneAndDelete(airline_id);
  },
};

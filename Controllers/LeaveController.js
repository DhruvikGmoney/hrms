const leaveModel = require("../Models/LeaveModel");

module.exports = {
  addLeave: async (req, res) => {
    const {
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
      modifyed_by, } = req.body;

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
      const allLeave = await leaveModel.find()
      if (allLeave.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `Leave Not Found In Database` });
      }
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
      const leave = await leaveModel.findById({ _id: leave_id });
      if (leave == null) {
        return res
          .status(404)
          .json({ status: false, message: `Leave Not Found With ID :- ${leave_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Leave Get Successfully", leave });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateLeave: async (req, res) => {
    try {
      const { leave_id } = req.params
      const leave = await leaveModel.findByIdAndUpdate({ _id: leave_id }, req.body, { new: true });
      if (leave == null) {
        return res
          .status(404)
          .json({ status: false, message: `Leave Not Found With ID :- ${leave_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Leave Updated Successfully", leave });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateLeaveStatus: async (req, res) => {
    try {
      const { leave_id, status } = req.params
      const leave = await leaveModel.findByIdAndUpdate(leave_id,
        { $set: { is_active: status } },
        { new: true });
      if (leave == null) {
        return res
          .status(404)
          .json({ status: false, message: `Leave Not Found With ID :- ${leave_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Leave Status Updated Successfully", leave });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  deleteLeave: async (req, res) => {
    try {
      const { leave_id } = req.params
      const leave = await leaveModel.findByIdAndDelete({ _id: leave_id });
      if (leave == null) {
        return res
          .status(404)
          .json({ status: false, message: `Leave Not Found With ID :- ${leave_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Leave Deleted Successfully", leave });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
};

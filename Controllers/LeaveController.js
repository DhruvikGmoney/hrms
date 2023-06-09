const leaveModel = require("../Models/LeaveModel");

module.exports = {
  addLeave: async (req, res) => {
    try {
      const {
        employee_id,
        type,
        leave_from,
        leave_to,
        description,
        status,
        is_verified,
        is_active,
        is_approved,
        approved_by,
        modifyed_by, } = req.body;

      if (type == "FULLDAY" && leave_from == leave_to) {
        return res.status(401).json({ status: false, message: "Start Date And End Date Should Not Be Same For Full Day Leave" })
      }
      if (type == "HALFDAY" && leave_from != leave_to) {
        return res.status(401).json({ status: false, message: "Start Date And End Date Should Be Same For Half Day Leave" })
      }
      var d1 = new Date(leave_from);
      var d2 = new Date(leave_to);
      var diff = d2.getDay() - d1.getDay()

      let day = (type == "FULLDAY") ? diff : 0.5;

      const leaveData = new leaveModel({
        employee_id,
        type,
        leave_from,
        leave_to,
        leave_duration: day,
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
            .json({ status: true, message: "Leave Apply Successfully", data });
        })
        .catch((error) => {
          return res.status(400).json({ message: error.message, error: error });
        });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
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
  getLeaveByUserId: async (req, res) => {
    try {
      const { employee_id } = req.params
      const leave = await leaveModel.find({ employee_id: employee_id });
      if (leave.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `Leave Not Found With User ID :- ${employee_id} ` });
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
  getLeaveByStatus: async (req, res) => {
    try {
      const { status } = req.params
      const leave = await leaveModel.find({ status: status });
      if (leave.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `Leave Not Found With Status :- ${status} ` });
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
  getLeaveByDate: async (req, res) => {
    try {
      const { start_date, end_date } = req.params
      const leave = await leaveModel.find({ $and: [{ start_date: { $gte: new Date(start_date) } }, { end_date: { $lte: new Date(end_date) } }] })
      if (leave.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `Leave Not Found Between :- ${start_date} - ${end_date} ` });
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

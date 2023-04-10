const leaveModel = require("../Models/LeaveModel");

module.exports = {
  addLeave: async (req, res) => {
    const { employee_id, is_verified, is_active, modifyed_by, checke_in_out } =
      req.body;

    const leaveData = new leaveModel({
      employee_id,
      is_verified,
      is_active,
      modifyed_by,
      checke_in_out,
    });
    leaveData
      .save()
      .then((data) => {
        return res
          .status(201)
          .json({ message: "Leave created Successfully", data });
      })
      .catch((error) => {
        return res.status(400).json({ message: error.message, error: error });
      });
  },
  getAllLeave: () => {
    return leaveModel.find();
  },
  getLeaveById: (leave_id) => {
    return leaveModel.findOne({ leave_id: leave_id });
    // return leaveModel.findOne(leave_id);
  },
  updateLeave: (leave_id, data) => {
    return leaveModel.findOneAndUpdate(leave_id, data);
    // return airlineModel.updateOne({ leave_id: leave_id }, body);
  },
  deleteLeave: (leave_id) => {
    return leaveModel.findOneAndDelete(leave_id);
    // return leaveModel.deleteOne({ leave_id: leave_id });
  },
};

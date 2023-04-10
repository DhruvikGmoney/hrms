const attendanceModel = require("../Models/AttendanceModel");

module.exports = {
  addAttendance: async (req, res) => {
    const { employee_id, is_verified, is_active, modifyed_by, checke_in_out } =
      req.body;

    const attendanceData = new attendanceModel({
      employee_id,
      is_verified,
      is_active,
      modifyed_by,
      checke_in_out,
    });
    attendanceData
      .save()
      .then((data) => {
        return res
          .status(201)
          .json({ status: true, message: "Attendance Created Successfully", data });
      })
      .catch((error) => {
        return res.status(400).json({ message: error.message, error: error });
      });
  },
  getAllAttendance: async (req, res) => {
    try {
      const allAttendance = await attendanceModel.find()//.populate("posts");
      return res
        .status(200)
        .json({ status: true, message: "Attendance Get Successfully", allAttendance });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getAttendanceById: async (req, res) => {
    try {

      const { attendance_id } = req.params
      const allAttendance = await attendanceModel.findOne({ attendance_id: attendance_id });
      return res
        .status(200)
        .json({ status: true, message: "Attendance Get Successfully", allAttendance });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
    // return attendanceModel.findById(attendance_id);
  },
  updateAttendance: async (req, res) => {
    try {

      const { attendance_id } = req.params
      const allAttendance = await attendanceModel.updateOne({ attendance_id: attendance_id }, req.body);
      return res
        .status(200)
        .json({ status: true, message: "Attendance Updated Successfully", allAttendance });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
    // return attendanceModel.findOneAndUpdate(attendance_id, body);
  },
  updateAttendanceStatus: async (req, res) => {
    try {

      const { attendance_id, status } = req.params
      const allAttendance = await attendanceModel.findByIdAndUpdate(attendance_id,
        { $set: { is_active: status } },
        { upsert: true, new: true });
      return res
        .status(200)
        .json({ status: true, message: "Attendance Status Updated Successfully", allAttendance });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
    // return attendanceModel.findOneAndUpdate(attendance_id, body);
  },
  deleteAttendance: async (req, res) => {
    try {

      const { attendance_id } = req.params
      const allAttendance = await attendanceModel.deleteOne({ attendance_id: attendance_id });
      return res
        .status(200)
        .json({ status: true, message: "Attendance Deleted Successfully", allAttendance });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
    // return airlineModel.findOneAndDelete(airline_id);
  },
};

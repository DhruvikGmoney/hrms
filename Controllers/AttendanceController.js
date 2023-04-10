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
          .json({ message: "Attendance created Successfully", data });
      })
      .catch((error) => {
        return res.status(400).json({ message: error.message, error: error });
      });
  },
  getAllAttendance: () => {
    return attendanceModel.find();
  },
  getAttendanceById: (attendance_id) => {
    return attendanceModel.findOne({ attendance_id: attendance_id });
    // return attendanceModel.findById(attendance_id);
  },
  updateAttendance: (attendance_id, body) => {
    return attendanceModel.updateOne({ attendance_id: attendance_id }, body);
    // return attendanceModel.findOneAndUpdate(attendance_id, body);
  },
  deleteAttendance: (attendance_id) => {
    return attendanceModel.deleteOne({ attendance_id: attendance_id });
    // return airlineModel.findOneAndDelete(airline_id);
  },
};

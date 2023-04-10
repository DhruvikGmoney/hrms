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
  getAllAttendance: async (req, res) => {

    const allAttendance = await attendanceModel.find()//.populate("posts");

    return res
      .status(201)
      .json({ message: "Attendance created Successfully", allAttendance });
  },
  getAttendanceById: async (req, res) => {
    const {attendance_id} =req.params
    const allAttendance = await attendanceModel.findOne({ attendance_id: attendance_id });
    return res
      .status(201)
      .json({ message: "Attendance created Successfully", allAttendance });

    // return attendanceModel.findById(attendance_id);
  },
  updateAttendance: async (req, res) => {
    const {attendance_id} =req.params
    const allAttendance = await attendanceModel.updateOne({ attendance_id: attendance_id }, req.body);
    return res
      .status(201)
      .json({ message: "Attendance created Successfully", allAttendance });

    // return attendanceModel.findOneAndUpdate(attendance_id, body);
  },
  deleteAttendance: async (req, res) => {
    const {attendance_id} =req.params
    const allAttendance = await attendanceModel.deleteOne({ attendance_id: attendance_id });
    return res
      .status(201)
      .json({ message: "Attendance created Successfully", allAttendance });

    // return airlineModel.findOneAndDelete(airline_id);
  },
};

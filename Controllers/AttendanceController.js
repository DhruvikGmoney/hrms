const attendanceModel = require('../Models/AttendanceModel');

module.exports = {
    addAttendance: data => {
        return attendanceModel.create(data);
    },
    getAllAttendance: () => {
        return attendanceModel.find();
    },
    getAttendanceById: attendance_id => {
        return attendanceModel.findOne({ attendance_id: attendance_id });
        // return attendanceModel.findById(attendance_id);
    },
    updateAttendance: (attendance_id, body) => {
        return attendanceModel.updateOne({ attendance_id: attendance_id }, body);
        // return attendanceModel.findOneAndUpdate(attendance_id, body);
    },
    deleteAttendance: attendance_id => {
        return attendanceModel.deleteOne({ attendance_id: attendance_id });
        // return airlineModel.findOneAndDelete(airline_id);
    }
};
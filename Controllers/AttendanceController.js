const attendanceModel = require("../Models/AttendanceModel");
const employeeModel = require("../Models/EmployeeModel");

module.exports = {
  checkeIn: async (req, res) => {
    try {
      const { employee_id, modifyed_by } = req.body;
      const employee = await employeeModel.findById({ _id: employee_id });
      if (employee == null) {
        return res
          .status(404)
          .json({ status: false, message: `Employee Not Found With ID :- ${employee_id} ` });
      }
      if (employee.is_checke_in) {
        return res
          .status(404)
          .json({ status: false, message: `Employee Already Check In :- ${employee_id} ` });
      }
      const date = new Date();
      let sortDate = new Date().toJSON().slice(0, 10);
      const attendanceData = new attendanceModel({
        employee_id,
        modifyed_by,
        date: sortDate,
        is_checke_in: true,
        checke_in: date
      });
      attendanceData
        .save()
        .then(async (attendance) => {
          await employeeModel.findByIdAndUpdate(employee_id,
            { $set: { is_checke_in: true } },
            { new: true });
          return res
            .status(201)
            .json({ status: true, message: "Checke In Successfully", attendance });
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
  checkeOut: async (req, res) => {
    try {
      const { employee_id, modifyed_by } = req.body;
      const employee = await employeeModel.findById({ _id: employee_id });
      if (employee == null) {
        return res
          .status(404)
          .json({ status: false, message: `Employee Not Found With ID :- ${employee_id} ` });
      }
      if (employee.is_checke_in == false) {
        return res
          .status(404)
          .json({ status: false, message: `Employee Already Check Out :- ${employee_id} ` });
      }
      const checkin = await attendanceModel.find({ is_checke_in: true }).sort({ createdAt: -1 }).limit(1);
      const letestCheckIn = checkin[0].checke_in
      const date = new Date();

      var difference = date - letestCheckIn;
      const hDiff = difference / 3600 / 1000;

      let sortDate = new Date().toJSON().slice(0, 10);
      const attendanceData = new attendanceModel({
        employee_id,
        modifyed_by,
        date: sortDate,
        hours: hDiff,
        is_checke_out: true,
        checke_out: date
      });
      attendanceData
        .save()
        .then(async (attendance) => {
          await employeeModel.findByIdAndUpdate(employee_id,
            { $set: { is_checke_in: false } },
            { new: true });
          return res
            .status(201)
            .json({ status: true, message: "Checke Out Successfully", attendance });
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
  addAttendance: async (req, res) => {
    try {
      const { employee_id, is_verified, is_active, modifyed_by, checke_in, checke_out } = req.body;

      const attendanceData = new attendanceModel({
        employee_id,
        is_verified,
        is_active,
        modifyed_by,
        checke_in,
        checke_out
      });
      attendanceData
        .save()
        .then((attendance) => {
          return res
            .status(201)
            .json({ status: true, message: "Attendance Created Successfully", attendance });
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
  getAllAttendance: async (req, res) => {
    try {
      const allAttendance = await attendanceModel.find()
      if (allAttendance.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `Attendance Not Found In Database` });
      }
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
      const { employee_id, date, hours } = req.query
      let attendance

      if (hours) {
        attendance = await attendanceModel.find({
          employee_id: employee_id, date: date, is_checke_out: true
        }).select("hours");
        if (attendance.length == 0) {
          return res
            .status(404)
            .json({ status: false, message: `Attendance Not Found ` });
        }
        const hours = attendance.reduce((acc, o) => acc + parseFloat(o.hours), 0)
        return res
          .status(200)
          .json({ status: true, message: `Total Hours Of Employee Id:- ${employee_id} For Date:- ${date}`, hours });
      } else if (employee_id && date) {
        attendance = await attendanceModel.find({
          employee_id: employee_id, date: date
        }).sort({ createdAt: 1 });
        if (attendance.length == 0) {
          return res
            .status(404)
            .json({ status: false, message: `Attendance Not Found ` });
        }
      }
      else {
        attendance = await attendanceModel.findById({ _id: attendance_id }).populate({ path: 'employee_id', select: 'role' });
      }
      if (attendance == null) {
        return res
          .status(404)
          .json({ status: false, message: `Attendance Not Found With ID :- ${attendance_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Attendance Get Successfully", attendance });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getAttendanceByEmployeeIdAndDate: async (req, res) => {
    try {
      const { employee_id, date } = req.params

      const attendance = await attendanceModel.find({
        employee_id: employee_id, date: date
      }).sort({ createdAt: 1 });

      if (attendance.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `Attendance Not Found ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Attendance Get Successfully", attendance });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getHoursByEmployeeIdAndDate: async (req, res) => {
    try {
      const { employee_id, date } = req.params

      const attendance = await attendanceModel.find({
        employee_id: employee_id, date: date, is_checke_out: true
      }).select("hours");

      const hours = attendance.reduce((acc, o) => acc + parseFloat(o.hours), 0)

      if (attendance.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `Attendance Not Found ` });
      }

      return res
        .status(200)
        .json({ status: true, message: `Total Hours Of Employee Id:- ${employee_id} For Date:- ${date}`, hours });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateAttendance: async (req, res) => {
    try {
      const { attendance_id } = req.params
      const attendance = await attendanceModel.findByIdAndUpdate({ _id: attendance_id }, req.body, { new: true });
      if (attendance == null) {
        return res
          .status(404)
          .json({ status: false, message: `Attendance Not Found With ID :- ${attendance_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Attendance Updated Successfully", attendance });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateAttendanceStatus: async (req, res) => {
    try {
      const { attendance_id, status } = req.params
      const attendance = await attendanceModel.findByIdAndUpdate(attendance_id,
        { $set: { is_active: status } },
        { new: true });
      if (attendance == null) {
        return res
          .status(404)
          .json({ status: false, message: `Attendance Not Found With ID :- ${attendance_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Attendance Status Updated Successfully", attendance });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  deleteAttendance: async (req, res) => {
    try {
      const { attendance_id } = req.params
      const attendance = await attendanceModel.findByIdAndDelete({ _id: attendance_id });
      if (attendance == null) {
        return res
          .status(404)
          .json({ status: false, message: `Attendance Not Found With ID :- ${attendance_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Attendance Deleted Successfully", attendance });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
};

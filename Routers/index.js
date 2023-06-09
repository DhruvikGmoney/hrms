const express = require("express");
const router = express.Router();
const AuthRoute = require("./AuthRoute");
const AttendanceRoute = require("./AttendanceRoute");
const DepartmentRoute = require("./DepartmentRoute");
const DesignationRoute = require("./DesignationRoute");
const EmployeeRoute = require("./EmployeeRoute");
const ExpensesRoute = require("./ExpensesRoute");
const LeaveRoute = require("./LeaveRoute");

router.get("/", (req, res) => {
  res.send(`Welcome To Hrms Portal With Version V1`);
});

router.use(
  "/v1",
  AuthRoute,
  AttendanceRoute,
  DepartmentRoute,
  DesignationRoute,
  EmployeeRoute,
  ExpensesRoute,
  LeaveRoute
);

module.exports = router;

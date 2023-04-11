const mongoose = require("mongoose");
const { mongo_uri } = require("../Config/Config");
const employeeModel = require("../Models/EmployeeModel");
const bcrypt = require("bcryptjs");

module.exports = function () {
  mongoose.set("strictQuery", false);
  mongoose.connect(mongo_uri, { useNewUrlParser: true });

  mongoose.connection.on("connected", async () => {
    console.log("Database Successfully Connected");
    employeeModel.findOne({ role: "SUPER_ADMIN" }, async function (err, data) {
      if (!data) {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash("superadmin", salt);
        const userData = new employeeModel({
          email: "superadmin@gmail.com",
          password: password,
          is_verified: true,
          is_active: true,
          role: "SUPER_ADMIN",
          first_name: "super",
          last_name: "admin",
          full_name: "super admin",
          phone: "9876543210",
          address: {
            address: "250",
            pincode: "395006",
            country: "India",
            state: "Gujarat",
            city: "Surat",
          },
          health_status: "Good",
        });
        userData
          .save()
          .then((adminData) => {
            console.log(
              `Admin User Created Successfully with Email "superadmin@gmail.com" And id ${adminData._id}`
            );
          }).catch((error) => {
            console.log(error.message);
          });
      }
    });
  });
};

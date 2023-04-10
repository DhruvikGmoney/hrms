const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const EmployeeModel = require("../Models/EmployeeModel");
const bcrypt = require("bcryptjs");

module.exports = function () {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

  mongoose.connection.on("connected", async () => {
    console.log("Database Successfully Connected");
    EmployeeModel.findOne({ role: "SUPER_ADMIN" }, async function (err, data) {
      console.log(data);
      if (!data) {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash("superadmin", salt);
        await EmployeeModel.create(
          {
            email: "superadmin@gmail.com",
            password: password,
            is_verified: true,
            is_active: true,
            role: "SUPER_ADMIN",
            first_name: "super",
            last_name: "admin",
            phone: "9876543210",
            city: "Surat",
            state: "Gujarat",
            country: "India",
            address: "Yogi Chowk",
            pincode: "395006",
            health_status: "Good",
          },
          (e, adminData) => {
            console.log(
              `Admin User Created Successfully with Email "superadmin@gmail.com" And id ${adminData}`
            );
          }
        );
      }
    });
  });
};

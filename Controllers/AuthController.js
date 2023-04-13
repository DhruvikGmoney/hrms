const { jwt_key } = require("../Config/Config");
const employeeModel = require("../Models/EmployeeModel");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendMail } = require('../Helpers/email')

module.exports = {
  register: async (req, res) => {
    try {
      const {
        role,
        first_name,
        middle_name,
        last_name,
        address,
        pincode,
        country,
        state,
        city,
        phone,
        email,
        gender,
        department_id,
        designation_id,
        manager_id,
        job_id,
        shift,
        date_of_birth,
        date_of_hire,
        salary,
        is_verified,
        is_active,
        last_login,
        modifyed_by, } = req.body;

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const user = await employeeModel.findOne({ email: email });

      if (user) {
        return res.status(400).json({ status: false, message: "User already registered" });
      } else {
        const userData = new employeeModel({
          role,
          first_name,
          middle_name,
          last_name,
          full_name: first_name + " " + middle_name + " " + last_name,
          address,
          pincode,
          country,
          state,
          city,
          phone,
          email,
          password,
          gender,
          department_id,
          designation_id,
          manager_id,
          job_id,
          shift,
          date_of_birth,
          date_of_hire,
          salary,
          is_verified,
          is_active,
          last_login,
          modifyed_by,
        });
        userData
          .save()
          .then((data) => {
            return res
              .status(201)
              .json({ status: true, message: "User created Successfully", data });
          })
          .catch((error) => {
            return res.status(400).json({ message: error.message, error: error });
          });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await employeeModel.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ status: false, message: "User Not Found" });
      }
      if (user.is_active == false) {
        return res.status(404).json({ status: false, message: "User is Not Active" });
      }
      if (user.is_verified == false) {
        return res.status(404).json({ status: false, message: "User is Not verified" });
      }
      let pass = await bcrypt.compare(password, user.password);
      // if (!pass) {
      //   return res.status(404).json({ status: false, message: "Password is Incorect" });
      // }
      if (user.email == email && pass) {
        let token = jsonwebtoken.sign(
          { id: user._id, email: email, role: user.role },
          jwt_key, {
          expiresIn: '12h'
        }
        );
        return res.status(200).json({ email, token });
      } else {
        return res
          .status(401)
          .json({ status: false, message: "Please Provide Valid Email And Password" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  logout: async (req, res) => {
    return employeeModel.find();
  },
  sendOtp: async (req, res) => {
    try {
      const otp = Math.floor(Math.random() * 9000 + 1000);
      let { email, for_forgot } = req.body
      console.log(otp, email);
      const employee = await employeeModel.findOne({ email: email });
      if (employee == null) {
        return res
          .status(404)
          .json({ status: false, message: `Employee Not Found With Email :- ${email} ` });
      }
      else {
        let purpose = ""
        if (for_forgot) {
          const employee = await employeeModel.findOneAndUpdate(email,
            { $set: { forgot_otp: otp } },
            { new: true });
          purpose = "Forgot Password"
        } else {
          const employee = await employeeModel.findOneAndUpdate(email,
            { $set: { otp: otp } },
            { new: true });
          purpose = "Verify Email"

        }
        sendMail(email, otp)
        return res
          .status(401)
          .json({ status: true, message: `Otp Sent Successfully on ${email} for ${purpose}, Please Check and Verify ✔` });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  verify: async (req, res) => {
    try {
      const { email, otp } = req.body
      const employee = await employeeModel.findOne({ email: email });
      if (employee == null) {
        return res
          .status(404)
          .json({ status: false, message: `Employee Not Found With Email :- ${email} ` });
      } else {
        if (employee.otp == otp) {
          const employee = await employeeModel.findOneAndUpdate(email,
            { $set: { is_verified: true, is_active: true } },
            { new: true });
          return res
            .status(200)
            .json({ status: true, message: `Varification SuccessFully For Email :- ${email} ` });
        } else {
          return res
            .status(404)
            .json({ status: false, message: `Please Enter Valid OTP` });
        }
      }
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { email, password, newPassword } = req.body
      const salt = await bcrypt.genSalt(10);
      const updatedPassword = await bcrypt.hash(newPassword, salt);
      const user = await employeeModel.findOne({ email: email });

      if (user.email == email && bcrypt.compare(password, user.password)) {
        const employee = await employeeModel.findOneAndUpdate(email,
          { $set: { password: updatedPassword } },
          { new: true });
        return res
          .status(200)
          .json({ status: true, message: `Password Updated Successfully For Email :- ${email} ` });
      } else {
        return res
          .status(401)
          .json({ status: false, message: "Please Provide Valid Email And Password" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body
      const salt = await bcrypt.genSalt(10);
      const updatedPassword = await bcrypt.hash(newPassword, salt);
      const user = await employeeModel.findOne({ email: email });
      if (user == null) {
        return res
          .status(404)
          .json({ status: false, message: `Employee Not Found With Email :- ${email} ` });
      }
      if (user.email == email && user.forgot_otp == otp) {
        const employee = await employeeModel.findOneAndUpdate(email,
          { $set: { password: updatedPassword } },
          { new: true });
        return res
          .status(200)
          .json({ status: true, message: `Password Updated Successfully For Email :- ${email} ` });
      } else {
        return res
          .status(401)
          .json({ status: false, message: "Please Provide Valid Email And Otp" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  }

};

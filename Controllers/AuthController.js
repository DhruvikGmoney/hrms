const { jwt_key } = require("../Config/Config");
const employeeModel = require("../Models/EmployeeModel");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
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
      modifyed_by,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = await employeeModel.findOne({ email: email });

    if (user) {
      return res.status(400).json({ message: "User already registered" });
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
            .json({ message: "User created Successfully", data });
        })
        .catch((error) => {
          return res.status(400).json({ message: error.message, error: error });
        });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await employeeModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    if (user.is_active == false) {
      return res.status(404).json({ message: "User is Not Active" });
    }
    if (user.is_verified == false) {
      return res.status(404).json({ message: "User is Not verified" });
    }
    if (user.email == email && bcrypt.compare(password, user.password)) {
      let token = jsonwebtoken.sign(
        { id: user._id, email: email, role: user.role },
        jwt_key,
        { expiresIn: "10h" }
      );
      return res.status(200).json({ email, token });
    } else {
      return res
        .status(401)
        .json({ message: "Please Provide Valid Email And Password" });
    }
  },
  logout: async (req, res) => {
    return employeeModel.find();
  },
  changePassword: (employee_id) => {
    return employeeModel.findOne({ employee_id: employee_id });
    // return employeeModel.findById(employee_id);
  },
  forgotPassword: (employee_id, body) => {
    return employeeModel.updateOne({ employee_id: employee_id }, body);
    // return employeeModel.findOneAndUpdate(employee_id, body);
  },
};

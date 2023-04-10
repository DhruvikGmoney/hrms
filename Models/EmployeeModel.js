const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const EmployeeSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN", "HR", "DEPARTMENT_MANAGER", "STAFF"],
      default: "STAFF",
    },
    first_name: { type: String, trim: true },
    middle_name: { type: String, trim: true },
    last_name: { type: String, trim: true },
    full_name: { type: String, trim: true },
    address: {
      address: { type: String, trim: true },
      pincode: { type: String, trim: true },
      country: { type: String, trim: true },
      state: { type: String, trim: true },
      city: { type: String, trim: true },

    },
    phone: {
      type: String,
      unique: true,
      match: [
        /^(\+\d{1,3}[- ]?)?\d{10}$/,
        "Please fill a valid telephone number",
      ],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Enter a valid email address",
      ],
      required: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, trim: true },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
      default: "MALE",
    },
    department_id: { type: Schema.Types.ObjectId, ref: "department" },
    designation_id: { type: Schema.Types.ObjectId, ref: "designation" },
    manager_id: { type: Schema.Types.ObjectId, ref: "employee" },
    job_id: { type: String, trim: true },
    shift: { type: String, enum: ["DAY", "NIGHT"], default: "Day" },
    date_of_birth: { type: Date },
    date_of_hire: { type: Date },
    salary: { type: Number },
    health_status: { type: String, trim: true },
    marital_status: {
      type: String,
      enum: ["MARRIED", "UNMARRIED"],
      default: "UNMARRIED",
    },
    is_verified: { type: Boolean, default: false },
    is_active: { type: Boolean, default: false },
    last_login: { type: Date, default: Date.now },
    modifyed_by: { type: Schema.Types.ObjectId, ref: "employee" },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("employee", EmployeeSchema);

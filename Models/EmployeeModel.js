const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const EmployeeSchema = new Schema({
    role: {
        type: String, enum: ["SUPER_ADMIN",
            "ADMIN",
            "HR",
            "DEPARTMENT_MANAGER",
            "STAFF"],
            default:"STAFF"
    },
    first_name: { type: String, trim: true },
    middle_name: { type: String, trim: true },
    last_name: { type: String, trim: true },
    full_name: { type: String, trim: true },
    address: { type: Number, trim: true },
    pincode: { type: String, trim: true },
    country: { type: String, trim: true },
    state: { type: String, trim: true },
    city: { type: String, trim: true },
    phone: { type: String, match: [/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Please fill a valid telephone number'],trim: true },
    email: { type: String, unique: true,match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter a valid email address'], required: true,
    lowercase: true,trim: true },
    password: { type: String, trim: true },
    gender: { type: String, trim: true },
    department_id: { type: String, trim: true },
    designation_id: { type: String, trim: true },
    manager_id: { type: String, trim: true },
    job_id: { type: String, trim: true },
    shift: { type: String, default: 'DayShift', trim: true },
    date_of_birth: { type: Date, trim: true },
    date_of_hire: { type: Date, trim: true },
    salary: { type: Number },
    is_verified: { type: Boolean ,default:false},
    is_active: { type: Boolean ,default:false},
    last_login: { type: Date, default: Date.now },
    modifyed_by: { type: String, trim: true },
},
    { versionKey: false ,timestamps: true});

module.exports = mongoose.model('employee', EmployeeSchema);
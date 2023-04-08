const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const LeaveSchema = new Schema({
    employee_id: { type: String, unique: true, required: true, trim: true },
    type: { type: String, unique: true, required: true, trim: true },
    start_date: { type: String, trim: true },
    end_date: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: { type: Date, required: true, trim: true },
    is_verified: { type: String, required: true, trim: true },
    is_active: { type: String, trim: true },
    is_approved: { type: String, trim: true },
    approved_by: { type: String, trim: true },
    modifyed_by: { type: String, trim: true },
},
    { versionKey: false ,timestamps: true});

module.exports = mongoose.model('leave', LeaveSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const AttendanceSchema = new Schema({
    user_id: { type: String, unique: true, ref: 'employee',required: true, trim: true },
    is_verified: { type: String, required: true,  trim: true },
    is_active: { type: String, trim: true },
    modifyed_by: { type: String, trim: true },
    checke_in_out: { type: String, unique: true, required: true, trim: true },
},
    { versionKey: false,timestamps: true });

module.exports = mongoose.model('attendance', AttendanceSchema)
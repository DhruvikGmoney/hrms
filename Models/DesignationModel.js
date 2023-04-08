const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const DesignationSchema = new Schema({
    designation_name: { type: String, unique: true, required: true, trim: true },
    description: { type: String, trim: true },
    is_verified: { type: String, required: true, ref: 'citys', trim: true },
    is_active: { type: String, trim: true },
    modifyed_by: { type: String, trim: true },
},
    { versionKey: false ,timestamps: true});

module.exports = mongoose.model('designation', DesignationSchema);
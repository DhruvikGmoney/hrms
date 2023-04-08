const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.pluralize(null);

ExpensesSchema = new Schema({
    amount: { type: String, unique: true, required: true, trim: true },
    purchased_at: { type: String, required: true, trim: true },
    purchased_from: { type: String, trim: true },
    quantity: { type: String, trim: true },
    status: { type: String, trim: true },
    description: { type: String, trim: true },
    department_id: { type: String, trim: true },
    is_verified: { type: String, required: true,  trim: true },
    is_active: { type: String, trim: true },
    is_approved: { type: String, trim: true },
    modifyed_by: { type: String, trim: true },
},
    { versionKey: false,timestamps: true });

module.exports = mongoose.model('expenses', ExpensesSchema);
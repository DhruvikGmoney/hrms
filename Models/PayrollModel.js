const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const PayrollSchema = new Schema(
  {
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    salary: { type: Number },
    salary_payable: { type: Number },
    month: { type: String, trim: true },
    year: { type: Number },
    bonus: { type: Number },
    bonus_comment: { type: String, trim: true },
    deduction: { type: Number },
    deduction_comment: { type: String, trim: true },
    total: { type: Number },
    working_hours: { type: Number },
    status: {
      type: String,
      enum: ["PAID", "PENDING", "REJECTED"],
      default: "PAID",
    },
    is_verified: { type: Boolean, default: false },
    is_active: { type: Boolean, default: false },
    modifyed_by: { type: Schema.Types.ObjectId, ref: "employee" },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("payroll", PayrollSchema);

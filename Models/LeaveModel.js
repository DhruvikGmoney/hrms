const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const LeaveSchema = new Schema(
  {
    employee_id: {
      type: Schema.Types.ObjectId,
      ref: "employee",
      required: true,
    },
    type: {
      type: String,
      enum: ["FULLDAY", "HALFDAY"],
      default: "FULLDAY",
    },
    leave_type: {
      type: String,
      enum: ["PAID", "UNPAID"],
      default: "PAID",
    },
    leave_from: { type: Date, required: true },
    leave_to: { type: Date, required: true },
    leave_duration: { type: Number },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: ["APPROVED", "PENDING", "REJECTED"],
      default: "PENDING",
    },
    is_verified: { type: Boolean, default: false },
    is_active: { type: Boolean, default: false },
    is_approved: { type: Boolean, default: false },
    approved_by: { type: Schema.Types.ObjectId, ref: "employee" },
    modifyed_by: { type: Schema.Types.ObjectId, ref: "employee" },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("leave", LeaveSchema);

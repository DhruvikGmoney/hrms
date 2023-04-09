const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const AttendanceSchema = new Schema(
  {
    employee_id: {
      type: Schema.Types.ObjectId,
      ref: "employee",
      required: true,
    },
    is_verified: { type: Boolean, default: false },
    is_active: { type: Boolean, default: false },
    modifyed_by: { type: Schema.Types.ObjectId, ref: "employee" },
    checke_in_out: { type: String },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("attendance", AttendanceSchema);

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
    checke_in: { type: Date },
    checke_out: { type: Date },
    is_checke_in: { type: Boolean },
    is_checke_out: { type: Boolean },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("attendance", AttendanceSchema);

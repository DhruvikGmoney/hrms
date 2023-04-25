const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const LeavePolicySchema = new Schema(
  {
    name: { type: String, trim: true },
    total_paid_leave: { type: Number },
    total_unpaid_leave: { type: Number },
    is_verified: { type: Boolean, default: false },
    is_active: { type: Boolean, default: false },
    modifyed_by: { type: Schema.Types.ObjectId, ref: "employee" },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("leave_policy", LeavePolicySchema);

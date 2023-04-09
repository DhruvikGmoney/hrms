const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const DepartmentSchema = new Schema(
  {
    manager_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "employee",
    },
    description: { type: String, trim: true },
    is_verified: { type: Boolean, default: false },
    is_active: { type: Boolean, default: false },
    modifyed_by: { type: Schema.Types.ObjectId, ref: "employee" },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("department", DepartmentSchema);

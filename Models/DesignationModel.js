const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const DesignationSchema = new Schema(
  {
    designation_name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    description: { type: String, trim: true },
    is_verified: { type: Boolean, default: false },
    is_active: { type: Boolean, default: false },
    modifyed_by: { type: Schema.Types.ObjectId, ref: "employee" },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("designation", DesignationSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

ExpensesSchema = new Schema(
  {
    amount: { type: Number, required: true },
    purchased_at: { type: Date, required: true },
    purchased_from: { type: String, trim: true },
    quantity: { type: Number, default: 1 },
    status: {
      type: String,
      enum: ["PAID ", "PENDING"],
      default: "PENDING",
    },
    description: { type: String, trim: true },
    department_id: { type: Schema.Types.ObjectId, ref: "department" },
    is_verified: { type: Boolean, default: false },
    is_active: { type: Boolean, default: false },
    is_approved: { type: Boolean, default: false },
    modifyed_by: { type: Schema.Types.ObjectId, ref: "employee" },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("expenses", ExpensesSchema);

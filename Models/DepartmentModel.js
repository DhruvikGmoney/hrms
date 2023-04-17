const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.pluralize(null);
const expensesModel = require("../Models/ExpensesModel");

const DepartmentSchema = new Schema(
  {
    manager_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "employee",
    },
    department_name: { type: String, trim: true },
    description: { type: String, trim: true },
    is_verified: { type: Boolean, default: false },
    is_active: { type: Boolean, default: false },
    modifyed_by: { type: Schema.Types.ObjectId, ref: "employee" },
  },
  { versionKey: false, timestamps: true }
);

DepartmentSchema.pre('deleteMany', function (next) {
  const departmentId = this.getQuery()['_id'];
  console.log('Removing doc!', departmentId);
  expensesModel.find({ department_id: departmentId }, function (err, properties) {
    if (err) {
      console.log("No property found in this project");
    } else if (properties.length == 0) {
      console.log("No property found in this project");
    } else {
      for (var i = 0; i < properties.length; i++) {
        properties[i].remove(function (delete_err, delete_data) {
          if (delete_err) {
            console.log("No property found in this project");
          } else {
            console.log("Properties deleted");
          }
        });
      }
    }
  });
  next();
});

module.exports = mongoose.model("department", DepartmentSchema);

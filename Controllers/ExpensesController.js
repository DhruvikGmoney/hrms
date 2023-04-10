const expensesModel = require("../Models/ExpensesModel");

module.exports = {
  addExpenses: async (req, res) => {
    const { employee_id, is_verified, is_active, modifyed_by, checke_in_out } =
      req.body;

    const expensesData = new expensesModel({
      employee_id,
      is_verified,
      is_active,
      modifyed_by,
      checke_in_out,
    });
    expensesData
      .save()
      .then((data) => {
        return res
          .status(201)
          .json({ message: "Expenses created Successfully", data });
      })
      .catch((error) => {
        return res.status(400).json({ message: error.message, error: error });
      });
  },
  getAllExpenses: () => {
    return expensesModel.find();
  },
  getExpensesById: (expenses_id) => {
    return expensesModel.findOne({ expenses_id: expenses_id });
    // return expensesModel.findById(expenses_id);
  },
  updateExpenses: (expenses_id, body) => {
    // return airlineModel.updateOne({ expenses_id: expenses_id }, body);
    return expensesModel.findOneAndUpdate(expenses_id, body);
  },
  deleteExpenses: (expenses_id) => {
    // return airlineModel.deleteOne({ expenses_id: expenses_id });
    return expensesModel.findOneAndDelete(expenses_id);
  },
};

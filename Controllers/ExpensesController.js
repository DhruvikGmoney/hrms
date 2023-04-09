const expensesModel = require("../Models/ExpensesModel");

module.exports = {
  addExpenses: async (req, res) => {
    const { employee_id, is_verified, is_active, modifyed_by, checke_in_out } =
      req.body;

    const user = await expensesModel.findOne({ email: email });

    if (user) {
      return res.status(400).json({ message: "User already registered" });
    } else {
      const userData = new expensesModel({
        employee_id,
        is_verified,
        is_active,
        modifyed_by,
        checke_in_out,
      });
      userData
        .save()
        .then((data) => {
          return res
            .status(201)
            .json({ message: "User created Successfully", data });
        })
        .catch((error) => {
          return res.status(400).json({ message: error.message, error: error });
        });
    }
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

const expensesModel = require("../Models/ExpensesModel");

module.exports = {
  addExpenses: async (req, res) => {
    try {
      const {
        amount,
        purchased_at,
        purchased_from,
        quantity,
        status,
        description,
        department_id,
        is_verified,
        is_active,
        is_approved,
        modifyed_by, } = req.body;

      const expensesData = new expensesModel({
        amount,
        purchased_at,
        purchased_from,
        quantity,
        status,
        description,
        department_id,
        is_verified,
        is_active,
        is_approved,
        modifyed_by,
      });
      expensesData
        .save()
        .then((data) => {
          return res
            .status(201)
            .json({ status: true, message: "Expenses Created Successfully", data });
        })
        .catch((error) => {
          return res.status(400).json({ message: error.message, error: error });
        });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getAllExpenses: async (req, res) => {
    try {
      const allExpenses = await expensesModel.find().populate('department_id');
      if (allExpenses.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `Expenses Not Found In Database` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Expenses Get Successfully", allExpenses });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getExpensesById: async (req, res) => {
    try {
      const { expenses_id } = req.params
      const expenses = await expensesModel.findById({ _id: expenses_id });
      if (expenses == null) {
        return res
          .status(404)
          .json({ status: false, message: `Expenses Not Found With ID :- ${expenses_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Expenses Get Successfully", expenses });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  getExpensesByStatus: async (req, res) => {
    try {
      const { status } = req.params
      const expenses = await expensesModel.find({ status: status });
      if (expenses.length == 0) {
        return res
          .status(404)
          .json({ status: false, message: `Expenses Not Found With Status :- ${status} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Expenses Get Successfully", expenses });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateExpenses: async (req, res) => {
    try {
      const { expenses_id } = req.params
      const expenses = await expensesModel.findByIdAndUpdate({ _id: expenses_id }, req.body, { new: true });
      if (expenses == null) {
        return res
          .status(404)
          .json({ status: false, message: `Expenses Not Found With ID :- ${expenses_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Expenses Updated Successfully", expenses });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  updateExpensesStatus: async (req, res) => {
    try {
      const { expenses_id, status } = req.params
      const expenses = await expensesModel.findByIdAndUpdate(expenses_id,
        { $set: { is_active: status } },
        { new: true });
      if (expenses == null) {
        return res
          .status(404)
          .json({ status: false, message: `Expenses Not Found With ID :- ${expenses_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Expenses Status Updated Successfully", expenses });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
  deleteExpenses: async (req, res) => {
    try {
      const { expenses_id } = req.params
      const expenses = await expensesModel.findByIdAndDelete({ _id: expenses_id });
      if (expenses == null) {
        return res
          .status(404)
          .json({ status: false, message: `Expenses Not Found With ID :- ${expenses_id} ` });
      }
      return res
        .status(200)
        .json({ status: true, message: "Expenses Deleted Successfully", expenses });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
  },
};

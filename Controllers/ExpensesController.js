const expensesModel = require("../Models/ExpensesModel");

module.exports = {
  addExpenses: async (req, res) => {
    const { amount,
      purchased_at,
      purchased_from,
      quantity,
      status,
      description,
      department_id,
      is_verified,
      is_active,
      is_approved,
      modifyed_by, } =
      req.body;

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
  },
  getAllExpenses: async (req, res) => {
    try {

      const allExpenses = await expensesModel.find()//.populate("posts");

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
      const allExpenses = await expensesModel.findOne({ expenses_id: expenses_id });
      return res
        .status(200)
        .json({ status: true, message: "Expenses Get Successfully", allExpenses });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
    // return expensesModel.findById(expenses_id);
  },
  updateExpenses: async (req, res) => {
    try {

      const { expenses_id } = req.params
      const allExpenses = await expensesModel.updateOne({ expenses_id: expenses_id }, req.body);
      return res
        .status(200)
        .json({ status: true, message: "Expenses Updated Successfully", allExpenses });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
    // return expensesModel.findOneAndUpdate(expenses_id, body);
  },
  updateExpensesStatus: async (req, res) => {
    try {

      const { expenses_id, status } = req.params
      const allExpenses = await expensesModel.findByIdAndUpdate(expenses_id,
        { $set: { is_active: status } },
        { upsert: true, new: true });
      return res
        .status(200)
        .json({ status: true, message: "Expenses Status Updated Successfully", allExpenses });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
    // return attendanceModel.findOneAndUpdate(expenses_id, body);
  },
  deleteExpenses: async (req, res) => {
    try {

      const { expenses_id } = req.params
      const allExpenses = await expensesModel.deleteOne({ expenses_id: expenses_id });
      return res
        .status(200)
        .json({ status: true, message: "Expenses Deleted Successfully", allExpenses });
    } catch (err) {
      return res
        .status(500)
        .json({ status: false, message: 'Server Error', error: err.message || err.toString() });
    }
    // return airlineModel.findOneAndDelete(airline_id);
  },
};

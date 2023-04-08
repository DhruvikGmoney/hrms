const expensesModel = require('../Models/ExpensesModel');

module.exports = {

    addExpenses: data => {
        return expensesModel.create(data);
    },
    getAllExpenses: () => {
        return expensesModel.find();
    },
    getExpensesById: expenses_id => {
        return expensesModel.findOne({expenses_id:expenses_id});
        // return expensesModel.findById(expenses_id);
    },
    updateExpenses: (expenses_id, body) => {
        // return airlineModel.updateOne({ expenses_id: expenses_id }, body);
        return expensesModel.findOneAndUpdate(expenses_id, body);
    },
    deleteExpenses: expenses_id => {
        // return airlineModel.deleteOne({ expenses_id: expenses_id });
        return expensesModel.findOneAndDelete(expenses_id);
    }
};
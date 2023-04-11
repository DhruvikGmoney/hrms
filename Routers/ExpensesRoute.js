const express = require("express");
const router = express.Router();
const ExpensesController = require("../Controllers/ExpensesController");

router.post("/addExpenses", ExpensesController.addExpenses);
router.get("/getAllExpenses", ExpensesController.getAllExpenses);
router.get("/getExpensesById/:expenses_id", ExpensesController.getExpensesById);
router.put("/updateExpenses/:expenses_id", ExpensesController.updateExpenses);
router.put("/updateExpensesStatus/:expenses_id/:status", ExpensesController.updateExpensesStatus);
router.delete("/deleteExpenses/:expenses_id", ExpensesController.deleteExpenses);

module.exports = router;

const express = require('express');
const { getExpenses, postExpenses, searchExpenseByDate } = require('../controller/expenses');
const expenseRoute = express.Router();

expenseRoute.route('/expense')
.post(postExpenses)
.get(getExpenses)

expenseRoute.route('/expense/search')
.get(searchExpenseByDate)

module.exports = expenseRoute;
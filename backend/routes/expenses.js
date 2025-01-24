const express = require('express');
const { getExpenses, postExpenses, searchExpenseByDate } = require('../controller/expenses');
const route = express.Router();

route.route('/expense')
.post(postExpenses)
.get(getExpenses)

route.route('/expense/search')
.get(searchExpenseByDate)

module.exports = route;
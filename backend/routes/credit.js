const express = require('express')
const { createCreditAccount, getCreditAccounts, searchAccountByName, payAmount, getPayAmountDetail } = require('../controller/credit')

const creditRoutes = express.Router()

creditRoutes.route('/credit')
.post(createCreditAccount)
.get(getCreditAccounts)

creditRoutes.get('/credit/search' , searchAccountByName)
creditRoutes.route('/credit/pay-amount/:id' )
.get(getPayAmountDetail)
.post(payAmount)

module.exports = creditRoutes;
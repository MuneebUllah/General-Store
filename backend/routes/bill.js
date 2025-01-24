const express = require('express');
const {
    billPost,
    getBills,
    updateBillAmount,
    getTotalSale,
    searchTodayCalcByName,
    searchBillByName
} = require('../controller/bill');
const authenticateToken = require('../middlewares/auth');
const billRoutes = express.Router()

billRoutes.route('/bill' , authenticateToken)
    .post(billPost)
    .get(getBills)

billRoutes.get('/bill/search', authenticateToken, searchBillByName)
billRoutes.route('/today-calc' , authenticateToken)
    .patch(updateBillAmount)
    .get(getTotalSale)

billRoutes.get('/today-calc/search', authenticateToken , searchTodayCalcByName)

module.exports = billRoutes;
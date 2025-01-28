const express = require('express');
const {
    billPost,
    getBills,
    updateBillAmount,
    getTotalSale,
    searchTodayCalcByName,
    searchBillByName,
    getSavingAmount,
    getBillSuggestions
} = require('../controller/bill');
const authenticateToken = require('../middlewares/auth');
const billRoutes = express.Router()

billRoutes.route('/bill')
    .post(billPost)
    .get(getBills)

billRoutes.get('/bill/search' , searchBillByName)
billRoutes.route('/today-calc' )
    .patch(updateBillAmount)
    .get(getTotalSale)

billRoutes.get('/today-calc/search', searchTodayCalcByName)
billRoutes.get('/saving' , getSavingAmount);
billRoutes.get('/suggestions', getBillSuggestions); // New endpoint for suggestions


module.exports = billRoutes;
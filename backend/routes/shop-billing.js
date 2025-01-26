const express = require('express')
const { createShopBill, getShopBill, getShopBillById, searchSaleByDate } = require('../controller/shop-billing')

const ShopBillingRoutes = express.Router()

ShopBillingRoutes.route('/shop-billing')
.post(createShopBill)
.get(getShopBill)

ShopBillingRoutes.get('/shop-billing/:id' , getShopBillById)
// ShopBillingRoutes.get('/shop-billing' , searchSaleByDate)

module.exports = ShopBillingRoutes;
const express = require("express");
const {
  updateBillAmount,
  searchTodayCalcByName,
  getSavingAmount,
  getBillSuggestions,
  createNewCompany,
  createNewBill,
  payment,
  getCompaniesName,
  getBills,
  getPaymentDetail,
  searchByName
} = require("../controller/bill");

const authenticateToken = require("../middlewares/auth");
const { post } = require("./shop-billing");
const billRoutes = express.Router();

billRoutes
  .route("/bill/companies")
  .post(createNewCompany)
  .get(getCompaniesName);

billRoutes.route("/bill/companies/:id/bills").post(createNewBill).get(getBills);

billRoutes
  .route("/bill/companies/:companyId/bills/:billId/payments")
  .post(payment)
  .get(getPaymentDetail);

billRoutes.get("/bill/search", searchByName);
billRoutes.route("/today-calc").patch(updateBillAmount);

billRoutes.get("/today-calc/search", searchTodayCalcByName);
billRoutes.get("/saving", getSavingAmount);
billRoutes.get("/suggestions", getBillSuggestions); // New endpoint for suggestions

module.exports = billRoutes;

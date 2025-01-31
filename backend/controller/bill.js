const { billModal, savingModal, cashModal } = require("../model/bill");

const createNewCompany = async (req, res) => {
  try {
    const { name } = req.body;
    const company = new billModal({ name });
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createNewBill = async (req, res) => {
  try {
    const { billName, invoiceNumber, totalAmount } = req.body;
    const company = await billModal.findById(req.params.id);
    if (!company) return res.status(404).json({ error: "Company not found" });

    const newBill = {
      billName,
      invoiceNumber,
      totalAmount,
      paidAmount: 0,
      payments: [],
    };
    company.bills.push(newBill);
    await company.save();
    res.status(201).json(newBill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const payment = async (req, res) => {
  try {
    let { amount, description, type } = req.body;

    // Convert amount to number
    amount = Number(amount);
    if (isNaN(amount)) {
      return res.status(400).json({ error: "Invalid amount value" });
    }

    const company = await billModal.findById(req.params.companyId);
    if (!company) return res.status(404).json({ error: "Company not found" });

    const bill = company.bills.id(req.params.billId);
    if (!bill) return res.status(404).json({ error: "Bill not found" });

    // Prevent paidAmount from going negative
    if (bill.paidAmount < 0) {
      return res.status(400).json({ error: "Paid amount cannot be negative" });
    }

    // Add payment record first
    const newPayment = { amount, description };
    bill.payments.push(newPayment);
    bill.paidAmount += amount; // Update paid amount

    // Handle different payment types
    if (type === "bill") {
      await addAmountToCash(bill.billName, amount, type);
    } else if (type === "others") {
    } else if (type === "bill from saving") {
      let savingRecord = await savingModal.findOne().sort({ date: -1 });

      if (!savingRecord || savingRecord.amount < amount) {
        return res
          .status(400)
          .json({ error: "Insufficient savings to pay the bill" });
      }

      // Deduct from savings
      savingRecord.amount -= amount;
      await savingRecord.save(); // Save updated savings record
    } else {
      return res.status(400).json({ error: "Please Enter The Correct Data" });
    }

    await company.save(); // Save the updated company and bills

    res.status(201).json({
      message: "Payment added successfully",
      description: newPayment.description,
      amount: newPayment.amount,
      remainingAmount: bill.totalAmount - bill.paidAmount,
    });
  } catch (error) {
    console.error("Payment Processing Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCompaniesName = async (req, res) => {
  try {
    const companies = await billModal.find().populate("bills");
    const companyData = companies.map((company) => ({
      _id: company._id,
      name: company.name,
      billCount: company.bills.length,
      remainingAmount: company.bills.reduce(
        (total, bill) => total + bill.remainingAmount,
        0
      ),
    }));
    res.status(200).json({ companies: companyData });
  } catch (error) {
    console.error("Error fetching bills:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBills = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await billModal.findById(id).populate("bills");
    if (!company) return res.status(404).json({ message: "Company not found" });

    if (!company.bills || company.bills.length === 0 ) {
      return res.status(200).json({ bills: [] });
    }

    const billData = company?.bills?.map((bill) => ({
      _id: bill._id,
      billName: bill.billName,
      invoiceNumber: bill.invoiceNumber,
      totalAmount: bill.totalAmount,
      paidAmount: bill.paidAmount,
      remainingAmount: bill.totalAmount - bill.paidAmount,
    }));

    // Move bills to history if fully paid
    const billsToMoveToHistory = company.bills.filter(
      (bill) => bill.totalAmount === bill.paidAmount
    );
    if (billsToMoveToHistory.length > 0) {
      console.log("Bill(s) fully paid! Moving to history...");

      // Create history records for fully paid bills
      const completedBills = billsToMoveToHistory.map((bill) => ({
        billName: bill.billName,
        invoiceNumber: bill.invoiceNumber,
        totalAmount: bill.totalAmount,
        paidAmount: bill.paidAmount,
        payments: bill.payments,
        completedAt: new Date(),
      }));

      // Add completed bills to history and remove them from active bills
      company.billHistory.push(...completedBills);
      company.bills = company.bills.filter(
        (bill) => bill.totalAmount !== bill.paidAmount
      ); // Remove fully paid bills
    }

    await company.save();

    res.status(200).json({ bills: billData });
  } catch (error) {
    console.error("Error fetching bills:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPaymentDetail = async (req, res) => {
  try {
    const { companyId, billId } = req.params;
    const company = await billModal.findById(companyId).populate({
      path: "bills",
      match: { _id: billId },
      populate: { path: "payments", select: "amount date description" }, // Explicitly select description
    });

    if (!company) return res.status(404).json({ message: "Company not found" });

    const bill = company.bills.find((bill) => bill._id.toString() === billId);
    if (!bill) return res.status(404).json({ message: "Bill not found" });

    let remainingAmount = bill.totalAmount;
    const payments = bill.payments.map((payment) => {
      remainingAmount -= payment.amount;
      return {
        date: new Date(payment.date).toLocaleDateString("en-GB"),
        amount: payment.amount,
        remainingAmount,
        description: payment.description , // Handle missing descriptions
      };
    });

    res.status(200).json({
      totalAmount: bill.totalAmount,
      payments,
      name: bill.billName,
    });
  } catch (error) {
    console.error("Error fetching bills:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const addAmountToCash = async (name, amount, type) => {
  try {
    // Set the date to today's date at midnight (00:00:00)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find today's cash record with the same name and type
    let cashRecord = await cashModal.findOne({ name, type, date: today });

    if (cashRecord) {
      // If a record already exists, update the totalCash field
      cashRecord.amount += parseFloat(amount);
      await cashRecord.save(); // Save the updated record
      console.log("Cash updated successfully", cashRecord);
    } else {
      // If no record exists, create a new cash record
      cashRecord = new cashModal({
        name,
        amount,
        type,
        totalCash: parseFloat(amount),
        date: today,
      });
      await cashRecord.save(); // Save the new record
      console.log("New cash record created", cashRecord);
    }
  } catch (error) {
    console.error("Error updating cash:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBillAmount = async (req, res) => {
  const { name, amount, type } = req.body; // 'type' indicates 'bill' or 'saving'

  if (!name || amount === undefined || type === undefined) {
    return res
      .status(400)
      .json({ error: "Please fill in all required fields" });
  }

  try {
    if (type === "saving") {
      // Handle Saving
      let savingRecord = await savingModal.findOne().sort({ date: -1 });

      if (!savingRecord) {
        // If no saving record exists, create a new one
        savingRecord = new savingModal({ amount: parseFloat(amount) });
      } else {
        // Update the existing saving record
        savingRecord.amount += parseFloat(amount);
      }

      await savingRecord.save(); // Save the updated or new record

      // Add saving amount to cash
      await addAmountToCash(name, amount, type);

      return res.json({
        message: "Saving added successfully",
        saving: savingRecord.amount,
      });
    } else if (type === "others") {
      // If the type is not "bill" or "saving", adjust to cash directly
      await addAmountToCash(name, amount, type); // Automatically add to cash
      return res.json({ message: "Amount added to cash successfully." });
    } else {
      return res.status(400).json({ error: "Please Enter The Correct Data" });
    }
  } catch (error) {
    console.error("Error processing data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTodayUpdatedBills = async (req, res) => {
  try {
    const startOfDay = new Date(
      Date.UTC(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        new Date().getUTCDate(),
        0,
        0,
        0,
        0
      )
    );
    const endOfDay = new Date(
      Date.UTC(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        new Date().getUTCDate(),
        23,
        59,
        59,
        999
      )
    );

    const startDateOnly = new Date(startOfDay);
    const endDateOnly = new Date(endOfDay);

    const startOfDayFormatted = startDateOnly.toISOString().split("T")[0];
    const endOfDayFormatted = endDateOnly.toISOString().split("T")[0];

    // Find bills updated between the start and end of the day
    const bills = await billModal.find({
      updatedAt: {
        $gte: startOfDayFormatted,
        $lt: endOfDayFormatted,
      },
      paidAmount: { $gt: 0 }, // Only bills with a paid amount greater than 0
    });

    if (bills.length === 0) {
      return res.json({ error: "No bills updated today" });
    }

    return res.json(bills);
  } catch (error) {
    console.error("Error fetching updated bills:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchByName = async (req, res) => {
    try {
      const { companyName, billName } = req.query; // Get both query parameters
  
      // If neither companyName nor billName is provided
      if (!companyName && !billName) {
        return res.status(400).json({ error: "At least one query parameter (companyName or billName) is required" });
      }
  
      // If companyName is provided, search by company name
      if (companyName) {
        const companyData = await billModal.aggregate([
          {
            $match: {
              name: { $regex: new RegExp(companyName, "i") }, // Case-insensitive partial match
            },
          },
          {
            $project: {
              name: 1,
              bills: 1, // Keep the bills array for further calculation
            },
          },
          {
            $addFields: {
              billCount: { $size: "$bills" }, // Calculate the number of bills
              remainingAmount: {
                $reduce: {
                  input: "$bills",
                  initialValue: 0,
                  in: { $add: ["$$value", { $subtract: ["$$this.totalAmount", "$$this.paidAmount"] }] },
                },
              }, // Calculate the remaining amount by subtracting paidAmount from totalAmount
            },
          },
          {
            $project: {
              name: 1,
              billCount: 1,
              remainingAmount: 1,
              _id: 1, // Document ka _id
              company: { _id: 1 }
            },
          },
        ]);
  
        if (companyData.length > 0) {
            
          return res.json(companyData); // Send company data in the same format
        }
      }
  
      // If billName is provided, search by bill name
      if (billName) {
        const billData = await billModal.aggregate([
          {
            $unwind: "$bills", // Unwind the bills array to search within each bill
          },
          {
            $match: {
              "bills.billName": { $regex: new RegExp(billName, "i") }, // Case-insensitive partial match
            },
          },
          {
            $project: {
              "bills.billName": 1,
              'bills.invoiceNumber': 1,
              "bills.totalAmount": 1,
              "bills.paidAmount": 1,
              "bills.remainingAmount": { $subtract: ["$bills.totalAmount", "$bills.paidAmount"] }, // Calculate remaining amount
             'bills._id': 1,
            },
          },
        ]);
  
        if (billData.length > 0) {
            const formattedBillData = billData.map((entry) => ({
                _id: entry.bills._id,
                billName: entry.bills.billName,
                invoiceNumber: entry.bills.invoiceNumber, // Assuming invoiceNumber is within the bill data
                totalAmount: entry.bills.totalAmount,
                paidAmount: entry.bills.paidAmount,
                remainingAmount: entry.bills.remainingAmount,
              }));
      
              return res.json(formattedBillData);; // Send the bill data with the desired structure
        }
      }
  
      return res.json({ error: "No matching company or bill found" });
    } catch (error) {
      console.error("Error searching by name:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

const searchTodayCalcByName = async (req, res) => {
  try {
    const { name, date } = req.query; // Get the name and date query parameters

    // Determine the start and end dates for the query
    const startOfDay = date
      ? new Date(new Date(date).setHours(0, 0, 0, 0))
      : new Date(new Date().setHours(0, 0, 0, 0));
    const endOfDay = date
      ? new Date(new Date(date).setHours(23, 59, 59, 999))
      : new Date(new Date().setHours(23, 59, 59, 999));

    // Build the match criteria dynamically
    let matchCriteria = {
      date: {
        $gte: startOfDay, // Start of specified or today's date
        $lt: endOfDay, // End of specified or today's date
      },
    };

    if (name) {
      matchCriteria.name = {
        $regex: new RegExp(name, "i"), // Case-insensitive partial match
      };
    }

    // Aggregate data for the specific name in cashModal
    const nameData = await cashModal.aggregate([
      {
        $match: matchCriteria,
      },
      {
        $sort: { date: -1 }, // Sort by date in descending order
      },
      {
        $project: {
          name: 1, // Display the name
          amount: 1, // Show the amount
          type: 1, // Show the type
          _id: 0, // Exclude _id field
        },
      },
    ]);

    if (nameData.length === 0) {
      return res.json({
        error: "No cash records found for the given criteria",
      });
    }

    // Calculate the total cash from the results
    const totalCash = nameData.reduce((sum, cash) => sum + cash.amount, 0);

    return res.json({
      totalCash, // Total of all amounts
      todayTotalCash: nameData, // All matching records
    });
  } catch (error) {
    console.error("Error fetching cash by name:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSavingAmount = async (req, res) => {
  try {
    // Find the latest saving record (or fetch all records if needed)
    const saving = await savingModal.findOne().sort({ date: -1 }); // Get the most recent record

    if (!saving) {
      return res.json({ message: "No Saving Found" });
    }

    return res.json({ amount: saving.amount });
  } catch (error) {
    console.error("Error fetching saving amount:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBillSuggestions = async (req, res) => {
  try {
    const { query } = req.query; // 'query' parameter for suggestions

    // Find distinct names matching the query
    const suggestions = await billModal
      .find(
        { name: { $regex: new RegExp(query, "i") } }, // Case-insensitive search
        { name: 1, _id: 0 } // Return only names
      )
      .limit(10); // Limit the results to 10 suggestions

    if (suggestions.length === 0) {
      return res.json({ message: "No suggestions found" });
    }

    return res.json(suggestions);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createNewCompany,
  createNewBill,
  payment,
  getCompaniesName,
  getBills,
  getPaymentDetail,
  updateBillAmount,
  getTodayUpdatedBills,
  searchByName,
  searchTodayCalcByName,
  getSavingAmount,
  getBillSuggestions,
};

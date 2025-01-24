const {billModal , savingModal , cashModal} = require('../model/bill')

const billPost = async (req, res) => {
    const { name, totalAmount, paidAmount } = req.body;

    const parsedTotalAmount = parseFloat(totalAmount)
    const parsedPaidAmount = parseFloat(paidAmount)

    if (!name || isNaN(parsedTotalAmount)) {
        return res.status(400).json({ error: 'Please fill the required fields' });
    }

    try {
        // Find the bill with the same name
        const existingBill = await billModal.findOne({ name });

        if (existingBill) {
            // Update the existing bill's totalAmount and paidAmount
            existingBill.totalAmount += parsedTotalAmount; // Add the new totalAmount to the existing one
            existingBill.paidAmount += parsedPaidAmount || 0; // Add the new paidAmount to the existing one (default to 0 if undefined)
            await existingBill.save(); // Save the updated bill
            return res.json({ message: 'Bill updated successfully', bill: existingBill });
        } else {
            // Create a new bill if it doesn't exist
            const newBill = new billModal({
                name,
                totalAmount:parsedTotalAmount,
                paidAmount: parsedPaidAmount || 0
            });
            await newBill.save();
            return res.json({ message: 'Bill added successfully', bill: newBill });
        }

    } catch (error) {
        console.error('Error processing bill:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getBills = async (req, res) => {
    try {
        const bills = await billModal.find({});

        if (bills.length === 0) {
            return res.json({ error: 'No Data Found' });
        }

        // Calculate remaining amount for each bill and collect bills to delete
        const billsWithRemainingAmount = [];
        const billsToDelete = [];

        for (const bill of bills) {
            const paidAmount = bill.paidAmount || 0; // Assume `paidAmount` is stored or calculated
            const remainingAmount = bill.totalAmount - paidAmount;

            if (remainingAmount <= 0) {
                // Add to list of bills to delete
                billsToDelete.push(bill._id);
            } else {
                // Add to the result if there's a remaining amount
                billsWithRemainingAmount.push({
                    name: bill.name,
                    totalAmount: bill.totalAmount,
                    paidAmount: paidAmount,
                    remainingAmount: remainingAmount
                });
            }
        }

        // Remove bills with no remaining amount
        if (billsToDelete.length > 0) {
            await billModal.deleteMany({ _id: { $in: billsToDelete } });
        }

        return res.json(billsWithRemainingAmount);
    } catch (error) {
        console.error('Error fetching bills:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
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
            console.log('Cash updated successfully');
        } else {
            // If no record exists, create a new cash record
            cashRecord = new cashModal({
                name,
                amount,
                type,
                totalCash: parseFloat(amount),
                date: today
            });
            await cashRecord.save(); // Save the new record
            console.log('New cash record created');
        }
    } catch (error) {
        console.error('Error updating cash:', error);
        return res.status(500).json({error:'Internal Server Error'})
    }
};


const updateBillAmount = async (req, res) => {
    const { name, amount, type } = req.body; // 'type' indicates 'bill' or 'saving'

    if (!name || amount === undefined || type === undefined) {
        return res.status(400).json({ error: 'Please fill in all required fields' });
    }

    try {
        if (type === 'bill' ) {
            // Handle Bill
            const bill = await billModal.findOne({ name  });
            if(bill){
                bill.paidAmount += parseFloat(amount);
                await bill.save();
            }
            else{
                res.status(404).json({error : 'No Specific Bill Found'})
            }

            await addAmountToCash(name , amount , type); // Add bill amount to cash
            return res.json({ message: 'Bill added successfully', bill });
        } else if (type === 'saving') {
            // Handle Saving
            const saving = await savingModal.create({ name, amount });
            await addAmountToCash(name , amount , type); // Add saving amount to cash
            return res.json({ message: 'Saving added successfully', saving });
        } else if(type === 'others') {
            // If the type is not "bill" or "saving", adjust to cash directly
            await addAmountToCash(name , amount , type); // Automatically add to cash
            return res.json({ message: 'Amount added to cash successfully.' });
        }
        else{
            return res.status(400).json({error:'Please Enter The Correct Data'})
        }
    } catch (error) {
        console.error('Error processing data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getTodayUpdatedBills = async (req, res) => {
    try {
        // Get today's date at midnight
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        // Get tomorrow's date at midnight
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Find bills updated between the start and end of the day
        const bills = await billModal.find({
            updatedAt: {
                $gte: startOfDay,
                $lt: endOfDay
            },
            paidAmount: { $gt: 0 } // Only bills with a paid amount greater than 0
        });

        if (bills.length === 0) {
            return res.json({ error: 'No bills updated today' });
        }

        return res.json(bills);
    } catch (error) {
        console.error('Error fetching updated bills:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getTotalSale = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        // Get tomorrow's date at midnight
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const startDateOnly = new Date(startOfDay.setHours(0, 0, 0, 0));
        const endDateOnly = new Date(endOfDay.setHours(23, 59, 59, 999));

        const startOfDayFormatted = startDateOnly.toISOString().split('T')[0];  // yyyy-mm-dd format
        const endOfDayFormatted = endDateOnly.toISOString().split('T')[0];
        
        // Find all cash entries for today
        const todayTotalCash = await cashModal.find({
            date: {
                $gte: startOfDayFormatted,
                $lt: endOfDayFormatted
            },        
        });

        // Sum all amounts in todayTotalCash
        const totalCash = todayTotalCash.reduce((sum, cash) => sum + cash.amount, 0);

        // Return response with the sum of amounts
        return res.json({
            message: 'Total sale for today',
            todayTotalCash,
            totalCash // Sum of all amounts
        });
    } catch (error) {
        console.error('Error calculating total sale:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const searchBillByName = async (req, res) => {
    try {
        const { name } = req.query; // Get the name query parameter

        if (!name) {
            return res.status(400).json({ error: 'Name query parameter is required' });
        }

        // Aggregate data for the specific name
        const nameData = await billModal.aggregate([
            {
                $match: {
                    name: {
                        $regex: new RegExp(name, 'i')  // Case-insensitive partial match
                    }
                }
            },
            {
                $project: {
                    name: 1,
                    totalAmount: 1,
                    paidAmount: 1,
                    remainingAmount: { $subtract: ["$totalAmount", "$paidAmount"] }, // Calculate remaining amount
                    _id: 0  // Exclude _id field
                }
            }
        ]);

        if (nameData.length === 0) {
            return res.json({ error: 'No bills found with the given name' });
        }

        return res.json(nameData);
    } catch (error) {
        console.error('Error fetching bills by name:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const searchTodayCalcByName = async (req, res) => {
    try {
        const { name, date } = req.query; // Get the name and date query parameters

        // Determine the start and end dates for the query
        const startOfDay = date ? new Date(new Date(date).setHours(0, 0, 0, 0)) : new Date(new Date().setHours(0, 0, 0, 0));
        const endOfDay = date ? new Date(new Date(date).setHours(23, 59, 59, 999)) : new Date(new Date().setHours(23, 59, 59, 999));

        // Build the match criteria dynamically
        let matchCriteria = {
            date: {
                $gte: startOfDay,  // Start of specified or today's date
                $lt: endOfDay      // End of specified or today's date
            }
        };

        if (name) {
            matchCriteria.name = {
                $regex: new RegExp(name, 'i') // Case-insensitive partial match
            };
        }

        // Aggregate data for the specific name in cashModal
        const nameData = await cashModal.aggregate([
            {
                $match: matchCriteria
            },
            {
                $sort: { date: -1 }  // Sort by date in descending order
            },
            {
                $project: {
                    name: 1,  // Display the name
                    amount: 1,  // Show the amount
                    type: 1,  // Show the type
                    _id: 0  // Exclude _id field
                }
            }
        ]);

        if (nameData.length === 0) {
            return res.json({ error: 'No cash records found for the given criteria' });
        }

        // Calculate the total cash from the results
        const totalCash = nameData.reduce((sum, cash) => sum + cash.amount, 0);

        return res.json({ 
            totalCash,  // Total of all amounts
            todayTotalCash: nameData  // All matching records
        });
    } catch (error) {
        console.error('Error fetching cash by name:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }    
};





module.exports = {
    billPost,
    getBills,
    updateBillAmount,
    getTodayUpdatedBills,
    getTotalSale,
    searchBillByName,
    searchTodayCalcByName
} 
const { payCreditAmountModal, creditModal } = require("../model/credit");

const createCreditAccount = async (req, res) => {
    const { name, totalAmount, phone, description } = req.body;

    const parsedTotalAmount = parseFloat(totalAmount);

    if (!name || isNaN(parsedTotalAmount)) {
        return res.status(400).json({ error: 'Please fill the required fields' });
    }

    try {
        // Find the bill with the same name
        const existingBill = await creditModal.findOne({ name });        
        // let parsedRemainingAmount = parsedTotalAmount;

        if (existingBill) {
            // parsedRemainingAmount += totalAmount
            // Update the existing bill's totalAmount
            existingBill.totalAmount += parsedTotalAmount; // Add the new totalAmount to the existing one
            await existingBill.save(); // Save the updated bill
        //    const payAmountSchema = new payCreditAmountModal({
        //         creditId:existingBill?._id,
        //         totalAmount,
        //         remainingAmount:parsedRemainingAmount,
        //         paidAmount:0,
        //         date:new Date(),
        //         description
        //     })
        //     payAmountSchema.save();
            return res.json({ message: 'Bill updated successfully', bill: existingBill });
        } else {
            // Create a new bill if it doesn't exist
            const newBill = new creditModal({
                name,
                totalAmount: parsedTotalAmount,
                phone,
                description,
                createdAt: new Date()
            });
            await newBill.save();
            return res.json(newBill);
        }

    } catch (error) {
        console.error('Error processing bill:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCreditAccounts = async (req, res) => {
    try {
        const accounts = await creditModal.find({});
        if (!accounts) {
            return res.json({ message: 'No Record Found' });
        }
        const accountsWithRemainingAmount = [];
        const accountsToDelete = [];

        for (const account of accounts) {
            const paidAmount = parseFloat(account.paidAmount || 0); // Safely parse paidAmount
            const remainingAmount = parseFloat(account.totalAmount) - paidAmount;

            if (remainingAmount <= 0) {
                // Add to list of bills to delete
                accountsToDelete.push(account.id);
            } else {
                // Add to the result if there's a remaining amount
                accountsWithRemainingAmount.push({
                    id: account.id,
                    name: account.name,
                    phone: account.phone,
                    totalAmount: parseFloat(account.totalAmount), // Parse totalAmount
                    paidAmount: paidAmount, // Parse paidAmount
                    remainingAmount: remainingAmount, // Parsed and calculated
                    date: account.createdAt
                });
            }
        }

        // Remove bills with no remaining amount
        if (accountsToDelete.length > 0) {
            await creditModal.deleteMany({ _id: { $in: accountsToDelete } });
        }

        return res.json(accountsWithRemainingAmount);

    } catch (error) {
        console.error('Error fetching cash by name:', error);
        return res.json({ error: 'Internal Server Error' });
    }
};

const searchAccountByName = async (req, res) => {
    try {
        const { name } = req.query; // Get the name query parameter

        if (!name) {
            return res.status(400).json({ error: 'Name query parameter is required' });
        }

        // Aggregate data for the specific name
        const nameData = await creditModal.aggregate([
            {
                $match: {
                    name: {
                        $regex: new RegExp(name, 'i') // Case-insensitive partial match
                    }
                }
            },
            {
                $lookup: {
                    from: 'paycreditamountmodals', // Collection name for payment details
                    localField: '_id',
                    foreignField: 'creditId',
                    as: 'paymentDetails'
                }
            },
            {
                $project: {
                    name: 1,
                    phone:1,
                    totalAmount: { $toDouble: "$totalAmount" }, // Convert to float
                    paidAmount: { $toDouble: "$paidAmount" }, // Convert to float
                    remainingAmount: { $subtract: ["$totalAmount", "$paidAmount"] }, // Calculate remaining amount
                    paymentDetails: {
                        $map: {
                            input: "$paymentDetails",
                            as: "payment",
                            in: {
                                paidAmount: { $toDouble: "$$payment.paidAmount" },
                                date: "$$payment.date",
                                description: "$$payment.description"
                            }
                        }
                    }
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

const payAmount = async (req, res) => {
    const { id } = req.params;
    const { paidAmount, description } = req.body;

    try {
        const record = await creditModal.findById(id);

        // Check if the record exists
        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }

        // Update the paidAmount and save the record
        record.paidAmount += parseFloat(paidAmount);
        await record.save();

        // Create a new payCreditAmountModal record
        const paid = await payCreditAmountModal.create({
            creditId: id,
            description,
            paidAmount: parseFloat(paidAmount), // Parse paidAmount
            date: new Date(),
            remainingAmount: parseFloat(record?.totalAmount) - parseFloat(paidAmount)
        });

        return res.json({ message: 'Amount Added Successfully', paid });
    } catch (error) {
        console.error('Error in payAmount:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPayAmountDetail = async (req, res) => {
    try {
        const record = await creditModal.findById(req.params.id); // Fetch main credit record
        const recordDetails = await payCreditAmountModal.find({ creditId: req.params.id }); // Fetch related payment records

        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }

        let totalPaidAmount = 0;
        const updatedDetails = recordDetails.map((detail, index) => {
            totalPaidAmount += parseFloat(detail.paidAmount || 0);
            const remainingAmount = parseFloat(record.totalAmount) - totalPaidAmount;

            return {
                ...detail.toObject(),
                remainingAmount,  // Calculate remainingAmount for each payment
            };
        });

        return res.json({
            totalAmount: parseFloat(record.totalAmount),
            name: record.name,
            remainingAmount: parseFloat(record.totalAmount) - totalPaidAmount, // Remaining amount at the account level
            details: updatedDetails,
        });
    } catch (error) {
        console.error('Error fetching record:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};


module.exports = {
    createCreditAccount,
    getCreditAccounts,
    searchAccountByName,
    payAmount,
    getPayAmountDetail
};

const ShopBilling = require("../model/shop-billing");

const createShopBill = async (req, res) => {
    const { items, discount = 0 } = req.body; // Discount defaults to 0 if not provided
    try {
        // Validation to ensure that items are provided
        items?.map((item , index) =>{
            if (!items ||!item?.name ||!item?.quantity || !item?.price || items.length === 0) {
                return res.status(400).json({ error: 'please filled the required fields.' });
            }
        })

        // Calculate totalAmount for each item and also calculate grandTotal
        let grandTotal = 0;
        let count = 0;
        const updatedItems = items.map((item , index) => {
            const totalAmount = item.quantity * item.price;
            grandTotal += totalAmount; // Adding to grandTotal
            count += index + 1;
            return {
                ...item,
                totalAmount,
                count
            };
        });

        // Apply discount if provided
        const finalTotal = grandTotal - discount;

        // Ensure the final total isn't negative (you could add more validation here if needed)
        const adjustedTotal = finalTotal < 0 ? 0 : finalTotal;

        // Create the new shop bill with the items array and grandTotal
        const shopBill = await ShopBilling.create({
            items: updatedItems,
            discount
        });

        return res.json({ message: 'Bill Created Successfully', shopBill, grandTotal,count, discount, adjustedTotal });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getShopBill = async (req, res) => {
    try {
        const { date } = req.query; // Get the `date` from the query parameters        

        // Calculate the start and end of the day for filtering
        const filter = {};
        const queryDate = date ? new Date(date) : new Date(); // Use the provided date or default to the current date

        const startOfDay = new Date(queryDate.setHours(0, 0, 0, 0)); // Start of the day (00:00:00)
        const endOfDay = new Date(queryDate.setHours(23, 59, 59, 999)); // End of the day (23:59:59)

        // Filter bills based on the calculated start and end of the day
        filter.createdAt = { $gte: startOfDay, $lte: endOfDay };

        // Fetch filtered bills
        const bills = await ShopBilling.find(filter);

        if (bills.length === 0) {
            return res.json({ message: 'No Bills Found' });
        }

        let totalSale = 0; // Initialize totalSale to 0

        // Iterate through each bill to calculate grandTotal and finalTotal
        const result = bills.map((bill) => {
            // Calculate grandTotal for the current bill
            const grandTotal = bill.items.reduce((total, item) => total + item.totalAmount, 0);

            // Get discount from the bill (if any)
            const discount = bill.discount || 0;

            // Apply the discount
            const adjustedTotal = grandTotal - discount;

            const count = bill.items.length;

            // Ensure the final total isn't negative
            const finalTotal = adjustedTotal < 0 ? 0 : adjustedTotal;

            // Add to totalSale
            totalSale += finalTotal;

            return {
                billItems: bill.items,
                createdAt: bill.createdAt,
                id: bill._id,
                grandTotal,
                count,
                discount,
                finalTotal,
            };
        });

        return res.json({ result, totalSale });
    } catch (error) {
        console.error(error); // Log error for debugging
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getShopBillById = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    
    try {
        const bill = await ShopBilling.findOne({ _id: id });
        if (!bill) {
            return res.json({ message: 'No Bill Found' });
        }

        // Calculate grandTotal for the bill
        const grandTotal = bill.items.reduce((total, item) => total + item.totalAmount, 0);

        // Apply discount if provided in the bill (assuming discount is part of the bill schema)
        const discount = bill.discount || 0; // Discount could be part of the document (you can add it in schema)
        const adjustedTotal = grandTotal - discount;

        // Ensure the final total isn't negative
        const finalTotal = adjustedTotal < 0 ? 0 : adjustedTotal;

        return res.json({ 
            items:bill?.items,
            createdAt:bill?.createdAt,
            id:bill?._id,
            grandTotal,
            discount, 
            finalTotal });
    } catch (error) {
        console.log(error)       
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const searchSaleByDate = async (req, res) => {
    try {
        const { date }  = req.query; // Get the name and date query parameters

        // Determine the start and end dates for the query
        const startOfDay = date ? new Date(new Date(date).setHours(0, 0, 0, 0)) : new Date(new Date().setHours(0, 0, 0, 0));
        const endOfDay = date ? new Date(new Date(date).setHours(23, 59, 59, 999)) : new Date(new Date().setHours(23, 59, 59, 999));

        // Build the match criteria dynamically
        let matchCriteria = {
            createdAt: {
                $gte: startOfDay,  // Start of specified or today's date
                $lt: endOfDay      // End of specified or today's date
            }
        };

        // Aggregate data for the specific name in cashModal
        const nameData = await ShopBilling.aggregate([
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
                    description: 1,  // Show the type
                    _id: 0  // Exclude _id field
                }
            }
        ]);

        console.log(startOfDay , endOfDay , date);
        

        if (bills.length === 0) {
            return res.json({ message: 'No Bills Found' });
        }

        let totalSale = 0; // Initialize totalSale to 0

        // Iterate through each bill to calculate grandTotal and finalTotal
        const result = bills.map((bill) => {
            // Calculate grandTotal for the current bill
            const grandTotal = bill.items.reduce((total, item) => total + item.totalAmount, 0);

            // Get discount from the bill (if any)
            const discount = bill.discount || 0;

            // Apply the discount
            const adjustedTotal = grandTotal - discount;

            const count = bill.items.length;

            // Ensure the final total isn't negative
            const finalTotal = adjustedTotal < 0 ? 0 : adjustedTotal;

            // Add to totalSale
            totalSale += finalTotal;

            return {
                billItems: bill.items,
                createdAt: bill.createdAt,
                id: bill._id,
                grandTotal,
                count,
                discount,
                finalTotal,
            };
        });

        return res.json({ result, totalSale });
    } catch (error) {
        console.error(error); // Log error for debugging
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createShopBill,
    getShopBill,
    getShopBillById,
    searchSaleByDate
};

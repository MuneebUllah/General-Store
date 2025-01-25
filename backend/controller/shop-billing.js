const ShopBilling = require("../model/shop-billing");

const createShopBill = async (req, res) => {
    const { items, discount = 0 } = req.body; // Discount defaults to 0 if not provided
    try {
        // Validation to ensure that items are provided
        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'Items array must contain at least one object.' });
        }

        // Calculate totalAmount for each item and also calculate grandTotal
        let grandTotal = 0;
        const updatedItems = items.map(item => {
            const totalAmount = item.quantity * item.price;
            grandTotal += totalAmount; // Adding to grandTotal
            return {
                ...item,
                totalAmount
            };
        });

        // Apply discount if provided
        const finalTotal = grandTotal - discount;

        // Ensure the final total isn't negative (you could add more validation here if needed)
        const adjustedTotal = finalTotal < 0 ? 0 : finalTotal;

        // Create the new shop bill with the items array and grandTotal
        const shopBill = await ShopBilling.create({
            items: updatedItems
        });

        return res.json({ message: 'Bill Created Successfully', shopBill, grandTotal, discount, adjustedTotal });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getShopBill = async (req, res) => {
    try {
        const bills = await ShopBilling.find({});
        if (bills.length === 0) {
            return res.json({ message: 'No Bills Found' });
        }

        // Iterate through each bill to calculate grandTotal and finalTotal
        const result = bills.map(bill => {
            // Calculate grandTotal for the current bill
            const grandTotal = bill.items.reduce((total, item) => total + item.totalAmount, 0);

            // Get discount from the bill (if any)
            const discount = bill.discount || 0; // Assuming discount is part of the bill document

            // Apply the discount
            const adjustedTotal = grandTotal - discount;

            // Ensure the final total isn't negative
            const finalTotal = adjustedTotal < 0 ? 0 : adjustedTotal;

            return {
                bill,
                grandTotal,
                discount,
                finalTotal
            };
        });

        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getShopBillById = async (req, res) => {
    const { Id } = req.params;
    try {
        const bill = await ShopBilling.findOne({ _id: Id });
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

        return res.json({ bill, grandTotal, discount, finalTotal });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createShopBill,
    getShopBill,
    getShopBillById
};

// utils/itemUtils.js
const modal = require('../model/modal'); // Adjust the path as necessary

const removeIfZeroQuantity = async (item) => {
    if (item.quantity <= 0) {
        await item.remove();
        console.log(`Item with id ${item._id} removed due to zero quantity.`);
    }
};

const updateQuantity = async (itemId, quantityChange) => {
    try {
        const item = await modal.findById(itemId);

        if (!item) {
            throw new Error('Item not found');
        }

        item.quantity += quantityChange;
        await item.save();
        await removeIfZeroQuantity(item);

        return item; // Return the item for further use if needed
    } catch (error) {
        console.error('Error updating quantity:', error);
        throw error;
    }
};

module.exports = { updateQuantity };

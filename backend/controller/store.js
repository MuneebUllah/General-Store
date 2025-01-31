const { modal, HistoryLog } = require("../model/store");
// const { updateQuantity } = require('../utils/itemUtils');

const getAllData = (req, res) => {
  modal
    .find({})
    .then((data) => res.json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const getAllCategories = async (req, res) => {
  try {
    // Fetch all distinct category values along with their counts
    const categories = await modal.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }, // Counts only top-level documents
          totalAmount: { $sum: "$totalAmount" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          count: 1,
          totalAmount: 1,
        },
      },
      {
        $sort: { category: 1 }, // Sorts the categories alphabetically in ascending order
      },
    ]);

    return res.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDataById = async (req, res) => {
  try {
    const data = await modal.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Data Not Found" });
    }
    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDataByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    // Using aggregation to group by 'name' and calculate totalAmount and count
    const data = await modal.aggregate([
      { $match: { category } }, // Filter by category
      {
        $group: {
          _id: "$name", // Group by 'name'
          totalAmount: { $sum: "$totalAmount" },
          count: { $sum: 1 }, // Count the number of items for each name
        },
      },
      {
        $project: {
          name: "$_id", // Rename '_id' to 'name'
          _id: 0, // Exclude '_id' from the output
          totalAmount: 1,
          count: 1,
        },
      },
      {
        $sort: { name: 1 }, // Sorts the categories alphabetically in ascending order
      },
    ]);

    if (data.length === 0) {
      return res.status(404).json({ error: "No data found for this category" });
    }

    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDataByName = async (req, res) => {
  try {
    const name = req.params.name;

    // Using aggregation to group by 'name' and calculate totalAmount and count
    const data = await modal.find({ name });

    if (data.length === 0) {
      return res.status(404).json({ error: "No data found for this category" });
    }

    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const createData = async (req, res) => {
  const { name, category, price, quantity, size, noOfItems, weight } = req.body;

  // Validate required fields
  if (!name || !category || !price || !quantity) {
    return res.status(400).json({ error: "Please enter the required fields" });
  }

  try {
    // Create the new item
    const result = await modal.create({
      name,
      category,
      quantity,
      price,
      size,
      weight,
      noOfItems,
    });

    // Log the creation action
    await HistoryLog.create({
      action: "create",
      name,
      category,
      size: size || null,
      weight: weight || null,
      quantity: result.quantity,
      previousQuantity: 0, // Since it's a new creation, the previous quantity is 0
      newQuantity: result.quantity,
      additionalInfo: `Created with price: ${price}, noOfItems: ${noOfItems}`,
    });

    return res
      .status(201)
      .json({ message: "Created Successfully", data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const addDataById = async (req, res) => {
  try {
    const { name, category, quantity, price, noOfItems, size, weight } =
      req.body;

    if (!name || !category || !quantity || !price || !noOfItems) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const query = { name, category, price, noOfItems };
    if (size) query.size = size;
    if (weight) query.weight = weight;

    // Find the item based on the dynamic query
    const item = await modal.findOne(query);

    if (!item) {
      return res.status(404).json({ error: "No matching item found" });
    }

    const previousQuantity = item.quantity;
    item.quantity += Number(quantity);
    const updatedItem = await item.save();

    // Log the action
    await HistoryLog.create({
      action: "add",
      name,
      category,
      size: size || null,
      weight: weight || null,
      quantity: Number(quantity),
      previousQuantity,
      newQuantity: item.quantity,
    });

    return res.json({
      message: "Quantity updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    console.error("Error updating item:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeDataById = async (req, res) => {
  try {
    const { name, category, quantity, price, noOfItems, size, weight } =
      req.body;

    if (!name || !category || !quantity || !price || !noOfItems) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a query object dynamically based on provided fields
    const query = { name, category, price, noOfItems };
    if (size) query.size = size;
    if (weight) query.weight = weight;

    // Find the item based on the dynamic query
    const item = await modal.findOne(query);

    if (!item) {
      return res.status(404).json({ error: "No matching item found" });
    }

    const previousQuantity = item.quantity;
    item.quantity -= Number(quantity);

    if (item.quantity <= 0) {
      await item.deleteOne();
      return res.json({
        message: "Item removed successfully as quantity reached zero",
      });
    } else {
      const updatedItem = await item.save();

      // Log the action
      await HistoryLog.create({
        action: "subtract",
        name,
        category,
        size: size || null,
        weight: weight || null,
        quantity: Number(quantity),
        previousQuantity,
        newQuantity: item.quantity,
      });

      return res.json({
        message: "Quantity updated successfully",
        data: updatedItem,
      });
    }
  } catch (error) {
    console.error("Error updating item:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteDataById = async (req, res) => {
  const update = req.body;
  const options = { new: true };
  const dataById = await modal.findByIdAndDelete(req.params.id);
  if (!dataById) return res.json({ error: "Plz Enter The Correct Id" });

  return res.json({ mcg: "Data Deleted Seccessfully" });
};

const getHistoryLogs = async (req, res) => {
  try {
    const logs = await HistoryLog.find().sort({ timestamp: -1 });
    return res.json({ logs });
  } catch (error) {
    console.error("Error fetching history logs:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchHistoryByName = async (req, res) => {
  try {
    const { name } = req.query; // Get the name from query parameters

    if (!name) {
      return res
        .status(400)
        .json({ error: "Name query parameter is required" });
    }

    // Query the HistoryLog model to fetch history records for the given name
    const nameHistoryData = await HistoryLog.aggregate([
      {
        $match: {
          name: {
            $regex: new RegExp(name, "i"), // Case-insensitive partial match
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          action: 1,
          quantity: 1,
          size: 1,
          weight: 1,
          previousQuantity: 1,
          newQuantity: 1,
          timestamp: 1,
          additionalInfo: 1,
        },
      },
      {
        $sort: { timestamp: -1 }, // Sort by timestamp to get the most recent records first
      },
    ]);

    // If no history records are found
    if (nameHistoryData.length === 0) {
      return res
        .status(404)
        .json({ message: "No history data found for this name" });
    }

    return res.json({ nameHistoryData });
  } catch (error) {
    console.error("Error fetching history by name:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchByCategory = async (req, res) => {
  try {
    const { category } = req.query; // Get the category from query parameters

    if (!category) {
      return res
        .status(400)
        .json({ error: "Category query parameter is required" });
    }

    // Aggregate data for the specific category
    const categoryData = await modal.aggregate([
      {
        $match: {
          category: {
            $regex: new RegExp(category, "i"), // Case-insensitive partial match
          },
        },
      }, // Filter documents by category
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          count: 1,
          totalAmount: 1,
        },
      },
    ]);

    // if (categoryData.length === 0) {
    //     return res.json();
    // }

    return res.json({ categoryData });
  } catch (error) {
    console.error("Error fetching category:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchByName = async (req, res) => {
  try {
    const { name } = req.query; // Get the category from query parameters

    if (!name) {
      return res
        .status(400)
        .json({ error: "Name query parameter is required" });
    }

    // Aggregate data for the specific category
    const nameData = await modal.aggregate([
      {
        $match: {
          name: {
            $regex: new RegExp(name, "i"), // Case-insensitive partial match
          },
        },
      },
      {
        $group: {
          _id: "$name",
          count: { $sum: 1 },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: 1,
          totalAmount: 1,
        },
      },
    ]);

    // if (nameData.length === 0) {
    //     return res.json({ message: 'Data not found' });
    // }

    return res.json({ nameData });
  } catch (error) {
    console.error("Error fetching category:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getStoreSuggestions = async (req, res) => {
  const { type  , query }= req.query;
  console.log(query , type);

// return res.json(suggestions);
  
  try {
    // Fetch distinct values for name, category, price, and size
    if (type === "name") {
      const names = await modal.find(
        { name: { $regex: new RegExp(query, 'i') } }, // Case-insensitive search
        { name: 1, _id: 0 } // Return only names
    ).limit(10);
      return res.json(names);
    } else if (type === "category") {
      const categories =await modal.find(
        { category: { $regex: new RegExp(query, 'i') } }, // Case-insensitive search
        { category: 1, _id: 0 } // Return only names
    ).limit(10);
      return res.json(categories);
    } else if (type === "size") {
      const sizes = await modal.find(
        { size: { $regex: new RegExp(query, 'i') } }, // Case-insensitive search
        { size: 1, _id: 0 } // Return only names
    ).limit(10);
      return res.json(sizes);
    } else {
      res.json({ message: "Please Enter The Correct Type" });
    }
    // Return the suggestions
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllData,
  getDataById,
  createData,
  removeDataById,
  addDataById,
  deleteDataById,
  getAllCategories,
  getDataByCategory,
  getDataByName,
  getHistoryLogs,
  searchByCategory,
  searchByName,
  searchHistoryByName,
  getStoreSuggestions,
};

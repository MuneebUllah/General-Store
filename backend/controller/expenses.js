const expenseModal = require('../model/expenses');
const expenseSchema = require('../model/expenses')

const postExpenses = async( req , res) => {
    const body = req.body;
    try{

        const data = await expenseSchema.create(body)
        if(!body){
            return res.status(400).json({message : 'Please Enter The Required Fields'})
        }
        return res.json({message : 'Expenses Added Successfully' , data})
    }
    catch(err){
        return res.status(500).json({error:'Internal Server Error' , err})
    }
}

const getExpenses = async (req, res) => {
    try {
        const currentDate = new Date();

        // Set start time to 9 AM of today (local time)
        const startOfDay = new Date(currentDate);
        startOfDay.setHours(9, 0, 0, 0);  // Set time to 09:00:00 local time

        // Set end time to 10 PM of today (local time)
        const endOfDay = new Date(currentDate);
        endOfDay.setHours(23, 59, 59, 59);

        const data = await expenseModal.find(

          {  createdAt: {
                $gte: startOfDay,  // Start of today (local)
                $lte: endOfDay     // End of today (local)
            },
       } );

        if (data.length === 0) {  // Check if no data found
            return res.json({ message: 'No Data Found' });
        }

        const totalExpense = data.reduce((sum, expense) => sum + expense.amount, 0);

        return res.json({data , totalExpense });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', error });
    }
};

const searchExpenseByDate = async (req, res) => {
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
        const nameData = await expenseModal.aggregate([
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
        

        if (nameData.length === 0) {
            return res.json({ error: 'No Expense records found ' });
        }

        // Calculate the total cash from the results
        const totalExpense = nameData.reduce((sum, cash) => sum + cash.amount, 0);

        return res.json({ 
            totalExpense:totalExpense,  // Total of all amounts
            data: nameData  // All matching records
        });
    } catch (error) {
        console.error('Error fetching cash by name:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    } 
}


module.exports = { postExpenses , getExpenses , searchExpenseByDate}
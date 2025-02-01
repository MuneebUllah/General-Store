const express = require('express')
const app = express()
const dbConnection = require('./backend/db-connection/index');
const PORT = 8000
const cors = require('cors');
const cron = require('node-cron');
const HistoryLog = require('./backend/model/store');
const storeRouter = require('./backend/routes/store');
const billRoutes = require('./backend/routes/bill');
const expenseRoute = require('./backend/routes/expenses');
const userRoutes = require('./backend/routes/user');
const creditRoutes = require('./backend/routes/credit');
const ShopBillingRoutes = require('./backend/routes/shop-billing');
const shopRouter = require('./backend/routes/shop')

app.use(cors());


// Schedule a job to run daily at midnight
cron.schedule('0 0 * * *', async () => {
    try {
        // Calculate the date six months ago
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        // Delete logs older than six months
        await HistoryLog.deleteMany({ createdAt: { $lt: sixMonthsAgo } });

        console.log('Old history logs deleted successfully.');
    } catch (error) {
        console.error('Error deleting old history logs:', error);
    }
});


    dbConnection('mongodb://localhost:27017')
    // dbConnection('mongodb+srv://muneebullah0099:Muneebjutt123@cluster0.fy81x.mongodb.net/')
    .then(()=> console.log('Mongodb Connected'))
    .catch((err)=> console.log(err))

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    app.use('/api/store', storeRouter)
    app.use('/api/companies-bill' , billRoutes)
    app.use('/api/expense' , expenseRoute)
    app.use('/' , userRoutes)
    app.use('/api/credit' , creditRoutes)
    app.use('/api/shop' , ShopBillingRoutes)
    app.use('/api/shop' , shopRouter)
app.listen(PORT, () => console.log('MongoDB Connected'))

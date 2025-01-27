const express = require('express')
const stopRouter = express.Router()

const {
    getAllData , 
    getDataById , 
    createData , 
    addDataById ,
    removeDataById, 
    deleteDataById,
    getAllCategories,
    getDataByCategory,
    getAllNames,
    getAllSizes,
    getAllPrices,
    getDataByName,
    // getHistoryLogs,
    searchByCategory,
    searchByName,
    // searchHistoryByName
} = require('../controller/shop')

stopRouter.route('/shop')
.get(getAllData)
.post(createData)

stopRouter.get('/categories', getAllCategories);
stopRouter.get('/name', getAllNames);
stopRouter.get('/price', getAllPrices);
stopRouter.get('/size', getAllSizes);
// stopRouter.get('/history', getHistoryLogs);
// stopRouter.get('/history/search' , searchHistoryByName)


stopRouter.route('/store/:id')
.get(getDataById)
.delete(deleteDataById)

stopRouter.patch('/add/:id', addDataById)
stopRouter.patch('/remove/:id', removeDataById)
stopRouter.get('/category/:category', getDataByCategory);
stopRouter.get('/name/:name', getDataByName);
stopRouter.get('/searchCategory' , searchByCategory)
stopRouter.get('/searchName' , searchByName)



module.exports = stopRouter;
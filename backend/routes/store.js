const express = require('express')
const storeRouter = express.Router()

const {
    getAllData , 
    getDataById , 
    createData , 
    addDataById ,
    removeDataById, 
    deleteDataById,
    getAllCategories,
    getDataByCategory,
    getDataByName,
    getHistoryLogs,
    searchByCategory,
    searchByName,
    searchHistoryByName,
    getStoreSuggestions
} = require('../controller/store')

storeRouter.route('/store')
.get(getAllData)
.post(createData)

storeRouter.get('/categories', getAllCategories);
storeRouter.get('/history', getHistoryLogs);
storeRouter.get('/history/search' , searchHistoryByName)


storeRouter.route('/store/:id')
.get(getDataById)
.delete(deleteDataById)

storeRouter.patch('/add/:id', addDataById)
storeRouter.patch('/remove/:id', removeDataById)
storeRouter.get('/category/:category', getDataByCategory);
storeRouter.get('/name/:name', getDataByName);
storeRouter.get('/searchCategory' , searchByCategory)
storeRouter.get('/searchName' , searchByName)
storeRouter.get('/suggestions', getStoreSuggestions);



module.exports = storeRouter;
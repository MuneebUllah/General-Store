import { Request } from "../../hooks/http";

export const Apis = {
    getAllData: () => Request.get('/store'),
    getDataById : (id) => Request.get(`/store/${id}`),
    getDataByCategories:(categories) => Request.get(`/category/${categories}`),
    getAllCategories:() => Request.get(`/categories`),
    getAllNames:() => Request.get(`/name`),
    getAllPrices:() => Request.get(`/price`),
    getAllSizes:() => Request.get(`/size`),
    postData: (body) => Request.post(`/store` , body),
    addDataById: (id , body) => Request.patch(`/add/${id}` , body),
    removeDataById: (id , body) => Request.patch(`/remove/${id}` , body),
    getDataByName: (name) => Request.get(`/name/${name}`),
    getHistory: () => Request.get('/history'),
    searchByName: (name) => Request.get(`/searchName?name=${name}`),
    searchHistoryByName: (name) => Request.get(`/history/search?name=${name}`),
    searchByCategory: (category) => Request.get(`/searchCategory?category=${category}`),

    //Billing Apis
    getBills:() => Request.get('/bill'),
    createBill:(body) => Request.post('/bill' , body),
    searchBill:(name) => Request.get(`bill/search?name=${name}`),

    updateBill:(body) => Request.patch('/today-calc' , body),
    getUpdatedBills:() => Request.get('/today-calc'),
    searchTodayCalc:({name , date}) => Request.get(`today-calc/search?name=${name}&date=${date}`),

    // Expenses
    postExpenses:(body) => Request.post('/expense' , body),
    getExpenses:() => Request.get('/expense'),
    searchExpenseByDate:(date) => Request.get(`/expense/search?date=${date}`),

    // Auth

    login: (body) => Request.post('/login' , body),
    // signUp:()
    
    createAccount:(body) => Request.post('/credit' , body),
    getCreditAccounts: () => Request.get('/credit'),
    searchAccount:(name) => Request.get(`/credit/search?name=${name}`),
    payAmount: (body , id) => Request.post(`/credit/pay-amount/${id}` , body),
    getPaidAmountDetail : (id) => Request.get(`/credit/pay-amount/${id}`),
    
    // Get Total Saving
    getTotalSaving : () => Request.get('/saving'),

    // Shop Billing
    createShopBill:(body) => Request.post('/shop-billing' , body),
    getShopBill:(date) => Request.get(`/shop-billing?date=${date}`),
    getShopBillById:(Id) => Request.get(`/shop-billing/${Id}`)

}
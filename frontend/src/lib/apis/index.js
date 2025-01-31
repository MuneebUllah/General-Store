import { Request } from "../../hooks/http";

export const Apis = {
    // Store
    getAllData: () => Request.get('/store/store'),
    getDataById : (id) => Request.get(`/store/store/${id}`),
    getDataByCategories:(categories) => Request.get(`/store/category/${categories}`),
    getAllCategories:() => Request.get(`/store/categories`),
    postData: (body) => Request.post(`/store/store` , body),
    addDataById: (id , body) => Request.patch(`/store/add/${id}` , body),
    removeDataById: (id , body) => Request.patch(`/store/remove/${id}` , body),
    getDataByName: (name) => Request.get(`/store/name/${name}`),
    getHistory: () => Request.get('/store/history'),
    searchByName: (name) => Request.get(`/store/searchName?name=${name}`),
    searchHistoryByName: (name) => Request.get(`/store/history/search?name=${name}`),
    searchByCategory: (category) => Request.get(`/store/searchCategory?category=${category}`),
    getStoreSuggestions:(type , query) => Request.get(`store/suggestions?type=${type}&query=${query}`),

    //Billing Apis
    createNewCompany:(body) => Request.post('/companies-bill/bill/companies' , body),
    getCompaniesName:() => Request.get('/companies-bill/bill/companies'),
    createNewBill:(id , body) => Request.post(`/companies-bill/bill/companies/${id}/bills` , body),
    getBills:(id) => Request.get(`/companies-bill/bill/companies/${id}/bills`),
    createPayment:(body , billId , companyId) =>Request.post(`/companies-bill/bill/companies/${companyId}/bills/${billId}/payments` , body),
    getPaymentDetail:(billId , companyId) => Request.get(`/companies-bill/bill/companies/${companyId}/bills/${billId}/payments`),
    searchBill: (type, name) => {
        console.log(name)        
        const query = type === 'company' ? `companyName=${name}` : `billName=${name}`;
        return Request.get(`/companies-bill/bill/search?${query}`);
      },    
    getBillSuggestions:(query) => Request.get(`/companies-bill/suggestions?query=${query}`),


    updateBill:(body) => Request.patch('/companies-bill/today-calc' , body),
    searchTodayCalc:({name , date}) => Request.get(`/companies-bill/today-calc/search?name=${name}&date=${date}`),

    // Expenses
    postExpenses:(body) => Request.post('/expense/expense' , body),
    getExpenses:() => Request.get('/expense/expense'),
    searchExpenseByDate:(date) => Request.get(`/expense/expense/search?date=${date}`),

    // Auth

    login: (body) => Request.post('/login' , body),
    // signUp:()
    
    createAccount:(body) => Request.post('/credit/credit' , body),
    getCreditAccounts: () => Request.get('/credit/credit'),
    searchAccount:(name) => Request.get(`/credit/credit/search?name=${name}`),
    payAmount: (body , id) => Request.post(`/credit/credit/pay-amount/${id}` , body),
    getPaidAmountDetail : (id) => Request.get(`/credit/credit/pay-amount/${id}`),
    
    // Get Total Saving
    getTotalSaving : () => Request.get('/companies-bill/saving'),

    // Shop Billing
    createShopBill:(body) => Request.post('/shop/shop-billing' , body),
    getShopBill:(date) => Request.get(`/shop/shop-billing?date=${date}`),
    getShopBillById:(Id) => Request.get(`/shop/shop-billing/${Id}`),

    // Shop Total Stock
    createNewStock:(body) => Request.post('/shop/shop' , body),
    getAllCategoriesForShop:() => Request.get(`/shop/shop/categories`),
    // getAllNamesForShop:() => Request.get(`/store/name`),
    // getAllPrices:() => Request.get(`/store/price`),
    // getAllSizes:() => Request.get(`/store/size`),
   



}
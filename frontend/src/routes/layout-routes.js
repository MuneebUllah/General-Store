import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import AvailableStock from "../container/store-module";
import CategoryData from "../container/store-module/category-data";
import NameData from "../container/store-module/name-data";
import TrackRecord from "../container/store/track-record";
import TodayTotalCalc from "../container/today-total-calc";
import Expenses from "../container/expenses";
import CreditDetail from '../container/credit-account/detail/index'
import Credit from "../container/credit-account";
import Dashboard from "../container/dashbard";
import Shop from "../container/shop/today-sale";
import BillDetail from "../container/shop/today-sale/detail/index";
import CategoriesInShop from "../container/shop/total-stock/categories";
import NameDataInShop from "../container/shop/total-stock/categories/name";
import TotalStockInShop from "../container/shop/total-stock";
import Companies from "../container/companies";
import Bill from "../container/companies/bills";
import PaymentDetail from "../container/companies/bills/payment-detail";

const LayoutRoutes = () => {
  const routes = [
    { path: "*", element: <Navigate to="/" /> },
    {path:'/' , element: <Dashboard /> },
    {path:'/store/total-stock' , element: <AvailableStock /> },
    {path:'/store/category' , element : <CategoryData /> },
    {path:'/store/name' , element : <NameData /> },
    {path:'/store/history' , element : <TrackRecord /> },
    {path:'/companies' , element: <Companies />},
    {path:'/companies/bill' , element: <Bill />},
    {path:'/companies/bill/payment' , element: <PaymentDetail />},
    {path:'/today-calc' , element: <TodayTotalCalc />},
    {path:'/expense' , element: <Expenses />},
    {path:'/credit' , element: <Credit />},
    {path:'/credit/detail' , element: <CreditDetail />},
    {path:'/shop/today-sale' , element: <Shop />},
    {path:'/shop/today-sale/detail/:id' , element: <BillDetail />},
    {path:'/shop/total-stock' , element: <TotalStockInShop /> },
    {path:'/shop/category' , element : <CategoriesInShop /> },
    {path:'/shop/name' , element : <NameDataInShop /> }
    
  

  ]



  return (
    <Layout>
      <Routes>
        {routes.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
      </Routes>
    </Layout>
  );
};

export default LayoutRoutes;

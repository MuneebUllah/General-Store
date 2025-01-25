import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import AvailableStock from "../container/store-module";
import CategoryData from "../container/store-module/category-data";
import NameData from "../container/store-module/name-data";
import TrackRecord from "../container/store/track-record";
import Bill from "../container/bill";
import TodayTotalCalc from "../container/today-total-calc";
import Expenses from "../container/expenses";
import CreditDetail from '../container/credit-account/detail/index'
import Credit from "../container/credit-account";
import Dashboard from "../container/dashbard";
import Shop from "../container/shop";
import BillDetail from "../container/shop/detail/index";

const LayoutRoutes = () => {
  const routes = [
    { path: "*", element: <Navigate to="/" /> },
    {path:'/' , element: <Dashboard /> },
    {path:'/data' , element: <AvailableStock /> },
    {path:'/data/category' , element : <CategoryData /> },
    {path:'/data/name' , element : <NameData /> },
    {path:'/history' , element : <TrackRecord /> },
    {path:'/bill' , element: <Bill />},
    {path:'/today-calc' , element: <TodayTotalCalc />},
    {path:'/expense' , element: <Expenses />},
    {path:'/credit' , element: <Credit />},
    {path:'/credit/detail' , element: <CreditDetail />},
    {path:'/shop' , element: <Shop />},
    {path:'/shop/detail/:id' , element: <BillDetail />},
  

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

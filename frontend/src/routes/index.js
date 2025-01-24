import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutRoutes from "./layout-routes";

const Approute = () => {
  return (
    <Routes>
      <Route path="/*" element={<LayoutRoutes />} />
    </Routes>
  );
};

export default Approute;

// Layout.js
import React from "react";
import Sidebar from "../navigation/Sidebar";
import { sidebarData } from "../helpers/constants";
import Navbar from "../navigation/Navbar";
import { SidebarItem } from "../navigation/SidebarItem";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  return (
    <div className="h-screen">
      <div className="flex flex-row-reverse h-full  overflow-hidden">
        <div className="w-full h-full">
          <Navbar />
          <main className="bg-[#F9F9F9] w-full  h-[calc(100%-80px)]  overflow-y-auto pb-4">
            {children}
          </main>
        </div>
        <Sidebar>
          {sidebarData.map((element , index) => {
            const isActive =
              element.path === "/" // Check if the element's path is the root
                ? location.pathname === "/" ||
                  location.pathname.includes("/dashboard") // If it's the root, check if the current path is also root
                : location.pathname.startsWith(element.path);
            return (
              <SidebarItem
                text={element.text}
                icon={element.icon}
                active={isActive}
                link={element.path}
                key={index}
              />
            );
          })}
        </Sidebar>
      </div>
    </div>
  );
};

export default Layout;

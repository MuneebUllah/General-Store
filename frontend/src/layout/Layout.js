// Layout.js
import React from "react";
import Sidebar from "../navigation/Sidebar";
import { sidebarData } from "../helpers/constants";
import Navbar from "../navigation/Navbar";
import { SidebarItem } from "../navigation/SidebarItem";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  const isPathActive = (path, children) => {
    if (path === "/") {
      // Check for root paths
      return location.pathname === "/" || location.pathname.includes("/dashboard");
    }
    // Check if the current path starts with the element's path or any of its children paths
    return (
      location.pathname.startsWith(path) ||
      (children &&
        children.some((child) => location.pathname.startsWith(child.path)))
    );
  };

  return (
    <div className="h-screen">
      <div className="flex flex-row-reverse h-full overflow-hidden">
        <div className="w-full h-full">
          <Navbar />
          <main className="bg-[#F9F9F9] custom-scrollbar w-full h-[calc(100%-80px)] overflow-y-auto pb-4">
            {children}
          </main>
        </div>
        <Sidebar>
          {sidebarData.map((element, index) => {
            const isActive = isPathActive(element.path, element.children);

            return (
              <SidebarItem
                key={index}
                text={element.text}
                icon={element.icon}
                link={element.path}
                alert={element.alert}
                children={element.children}
                active={isActive}
              />
            );
          })}
        </Sidebar>
      </div>
    </div>
  );
};

export default Layout;

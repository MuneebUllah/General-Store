import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export function SidebarItem({ text, icon, active, link, alert, children }) {
  const { isSidebarExpanded } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div>
      <li
        className={`relative flex items-center justify-center w-full p-3 h-18
          text-[#808D9E] font-normal text-base cursor-pointer transition-colors group ${
            active
              ? "bg-[#98a8b433] text-white border-white border-l-2"
              : "hover:bg-[#98a8b433] hover:border-white hover:border-l-2 hover:text-white"
          }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`${isSidebarExpanded ? "ml-6" : ""}`}>{icon}</div>
        <span
          className={`overflow-hidden transition-all ${
            isSidebarExpanded ? "w-52 ml-6" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-[#2E4D55] ${
              isSidebarExpanded ? "" : "top-2"
            }`}
          />
        )}
      </li>

      {/* Render nested items */}
      {children && isOpen && (
        <ul className="transition-all">
          {children.map((child, index) => {
            const isChildActive = location.pathname === child.path; // Check if the child path is active
            return (
              <Link key={index} to={child.path}>
                <li
                  className={`flex items-center pl-8 p-2 text-[#808D9E] transition-colors ${
                    isChildActive
                      ? "bg-[#98a8b433] text-white border-white border-l-2"
                      : "hover:bg-[#98a8b433] hover:border-white hover:border-l-2 hover:text-white"
                  }`}
                >
                  <div className={`ml-2 ${isSidebarExpanded ? "ml-8" : "w-0"}`}>{child.icon}</div>
                  <span className={`ml-2 ${isSidebarExpanded ? "w-52" : "w-0"}`}>
                    {child.text}
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  )
}

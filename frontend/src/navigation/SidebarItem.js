import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export function SidebarItem({ text, icon, active, link, alert, children }) {
  const { isSidebarExpanded } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleParentClick = (e) => {
    if (children) {
      // If children exist, prevent navigation and toggle submenu
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      {/* Parent Navigation */}
      <Link to={!children ? link : "#"} onClick={handleParentClick}>
        <li
          className={`relative flex items-center justify-center w-full p-3 h-18
          text-[#808D9E] font-normal text-base cursor-pointer transition-colors group ${
            active
              ? "bg-[#6c9dc0e0] text-white border-white border-l-2"
              : "hover:bg-[#6c9dc0e0] hover:border-white hover:border-l-2 hover:text-white"
          }`}
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
      </Link>

      {/* Render Nested Items */}
      {children && isOpen && (
        <ul className="transition-all">
          {children.map((child, index) => {
            const isChildActive = location.pathname === child.path; // Check if the child path is active
            return (
              <Link key={index} to={child.path}>
                <li
                  className={`flex items-center pl-8 p-2 text-[#808D9E] transition-colors ${
                    isChildActive
                      ? "bg-[#6c9dc0e0] text-white border-white border-l-2"
                      : "hover:bg-[#6c9dc0e0] hover:border-white hover:border-l-2 hover:text-white"
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
  );
}

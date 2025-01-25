import { useSelector } from "react-redux";
import { colors } from "../helpers/constants";
import { Link } from "react-router-dom";

export function SidebarItem({ text , icon, active,  link , alert}) {
  const { isSidebarExpanded } = useSelector((state) => state.user);

  return (
    <Link to={link}>
      <li
        className={`
        relative flex items-center justify-center w-full p-3 h-18
        text-[#808D9E]
        font-normal text-base cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-[#98a8b433] text-white border-white border-l-2"
            : "hover:bg-[#98a8b433] hover:border-white hover:border-l-2 hover:text-white "
        }
    `}
      >
        <div
          className={`${isSidebarExpanded ? "ml-6" : ""}
        `}
        >
          {icon}
        </div>
        <span
          className={` overflow-hidden transition-all ${
            isSidebarExpanded ? "w-52 ml-6" : "w-0 "
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-[${
              colors.primary
            }] ${isSidebarExpanded ? "" : "top-2"}`}
          />
        )}

        {!isSidebarExpanded && (
          <div
            className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-[${colors.primary}] text-white text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}

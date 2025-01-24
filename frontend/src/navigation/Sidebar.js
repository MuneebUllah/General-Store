import { useSelector } from "react-redux";
import logo from '../assets/images/logo.jpeg';

export default function Sidebar({ children }) {
  const { isSidebarExpanded } = useSelector((state) => state.user);

  return (
    <aside
      className={`h-screen ${isSidebarExpanded ? " w-64" : "w-20"}`}
      style={{
        backgroundImage: `url(/img/sidebarbg.png)`,
        objectFit: "contain",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <nav className="h-full flex pt-8 flex-col bg-transparent border-r shadow-sm">
      <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo}
            className={`overflow-hidden rounded-2xl transition-all ${
              isSidebarExpanded ? "w-32" : "w-12"
            } mx-auto`}
            alt=""
          />
        </div>

        <ul className="flex-1 ">{children}</ul>
      </nav>
    </aside>
  );
}

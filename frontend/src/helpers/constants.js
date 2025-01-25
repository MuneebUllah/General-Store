import { AiOutlineWechat } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import { IoTodayOutline } from "react-icons/io5";

export const colors = {
  primary: "#2E4D55",
  orange: "#E4774F"
};
export const fontSize = {
  span: '28px'
};
export const dashboard = {
  likes:'500',
  shares:'900',
  Media:'1300',
  stories:'560',
  posts:'260',
  users:'960',
}
export const sidebarData = [
  {
    text: "Dashboard",
    path: "/",
    icon: <RxDashboard  size={20}/>,
  },
  {
    text: "Today Calculation",
    path: "/today-calc",
    icon: <IoTodayOutline size={20} />,
  },
  {
    text: "Shop",
    path: "/shop",
    icon: <AiOutlineWechat size={20} />,
  },
  {
    text: "Store",
    path: "/data",
    icon: <MdOutlineLocalGroceryStore size={20} />,
  },
  { text: "Expenses", path: "/expense", icon: <FaUsers size={20} /> },

  { text: "Track Record", path: "/history", icon: <FaHistory size={20} /> },
  { text: "Companies Bill", path: "/bill", icon: <FaRegMoneyBillAlt  size={20}/> },
  { text: "Credit Account", path: "/credit", icon: <CiCreditCard1 size={20} /> },

];

import { AiOutlineWechat } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { HiMiniSquares2X2 } from "react-icons/hi2";

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
    text: "Today Calculation",
    path: "/today-calc",
    icon: <HiMiniSquares2X2 size={20} />,
  },
  {
    text: "Total Available Stock",
    path: "/data",
    icon: <HiMiniSquares2X2 size={20} />,
  },
  { text: "Expenses", path: "/expense", icon: <FaUsers size={20} /> },

  { text: "Track Record", path: "/history", icon: <AiOutlineWechat size={20} /> },
  { text: "Billing", path: "/bill", icon: <AiOutlineWechat size={20} /> },
  { text: "Credit Account", path: "/credit", icon: <FaUsers size={20} /> },

];

import { useEffect, useState } from "react";
import { Searchinput } from "../../../components/forms/input/index.jsx";
import Button from "../../../components/primary-button/index.jsx";
import ShopBillsPopup from "../../../helpers/models/popups/shop-bills/index.js";
import moment from "moment";
import NoDataFound from "../../../components/no-data-found/index.jsx";
import useShopBilling from "./useHook.js";
import view from "../../../assets/images/view-icon.svg";
import { useNavigate } from "react-router-dom";
import { setNewBillModalIsOpen, setNewStockInShopModalIsOpen } from "../../../redux/slices/userSlice.js";
import { dispatch } from "../../../redux/store/store.js";
import { useSelector } from "react-redux";
import NewStockInShopPopup from "../../../helpers/models/popups/shop-bills/new-stock.js";

const Shop = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  const { getShopBill } = useShopBilling();
  const { newBillModalIsOpen , newStockInShopModalIsOpen} = useSelector((state) => state.user);

  useEffect(() => {
    getShopBill(setData);
  }, [newBillModalIsOpen , newStockInShopModalIsOpen]);
  const navigate = useNavigate();

  const search = (type) => {
    console.log("function called");

    if (type) {
      getShopBill(setData, date);
    } else {
      getShopBill(setData);
    }
  };

  return (
    <>
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">
            {moment(date).format("DD/MM/YYYY")}
          </h1>
            <button
              width="16rem"
              className="bg-[#00B087] text-white w-[10rem] h-12 cursor-pointer text-center text-base inline-block px-4 py-2 rounded-lg"
              onClick={() => {
                dispatch(setNewBillModalIsOpen(true));
              }}
            >
              New Bill
            </button>
        </div>
        <div className="mb-6 flex gap-8 justify-between items-center">
          <div className="w-3/4">
            <Searchinput
              type="date"
              placeholder="Search By Date"
              onchange={(value) => setDate(value)}
              value={date}
            />
          </div>
          <div className="flex w-3/12 space-x-4">
            <Button
              title="Search"
              width="16rem"
              fill={true}
              onclick={() => search(true)}
            />
            <Button
              title="Reset"
              width="16rem"
              backgroundColor="#E4774F"
              fill={true}
              onclick={() => search(false)}
            />
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  No. of Items
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.result?.length > 0 ? (
                data?.result?.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{item?.billItems[0]?.name}</td>
                    <td className="px-6 py-4">{item?.count}</td>
                    <td className="px-6 py-4">{item?.finalTotal}</td>
                    <td className="px-6 py-4">
                      <img
                        src={view}
                        alt="view"
                        className="w-8 h-8 cursor-pointer"
                        onClick={() => navigate(`/shop/today-sale/detail/${item?.id}`)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <NoDataFound />
              )}
            </tbody>
          </table>
          <div className="flex justify-between w-full px-6 py-3">
            <h1 className="text-2xl font-semibold">Total Sale</h1>
            <h1 className="text-2xl font-semibold">{data?.totalSale}</h1>
          </div>
        </div>
      </div>
      <ShopBillsPopup />
      <NewStockInShopPopup />
    </>
  );
};

export default Shop;

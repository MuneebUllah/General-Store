import { useEffect, useState } from "react";
import { Searchinput } from "../../../components/forms/input";
import NoDataFound from "../../../components/no-data-found";
import Button from "../../../components/primary-button";
import useBill from "./useHook";
import { useSelector } from "react-redux";
import { setAddBillModalIsOpen } from "../../../redux/slices/userSlice";
import { dispatch } from "../../../redux/store/store";
import AddBillPopup from "../../../helpers/models/popups/add-comapny/add-bill/index";
import view from '../../../assets/images/view-icon.svg'
import { useLocation, useNavigate } from "react-router-dom";

const Bill = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const { getBills, searchBill } = useBill();
  const { addBillModalIsOpen } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation()
  const  id  = location.state;

  const search = (type) => {
    if (type) {
      searchBill(name, setData);
    } else {
      getBills(id , setData);
    }
  };

  useEffect(() => {
    getBills(id , setData);
  }, [addBillModalIsOpen]);
  
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">{"Bills"}</h1>

        <button
          width="16rem"
          className="bg-[#00B087] text-white w-[10rem] h-12 cursor-pointer text-center text-base inline-block px-4 py-2 rounded-lg"
          onClick={() => {
            dispatch(setAddBillModalIsOpen(true));
          }}
        >
          Add Bill
        </button>
      </div>
      <div className="mb-6 flex gap-8 justify-between items-center">
        <div className="w-3/4">
          <Searchinput
            placeholder="Search By Name"
            onchange={(value) => setName(value)}
            value={name}
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
                Serial No.
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Bill Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Invoice Number
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Paid Amount
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Remaining Amount
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Total Amount
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{item?.billName}</td>
                  <td className="px-6 py-4">{item?.invoiceNumber}</td>
                  <td className="px-6 py-4">{item?.paidAmount}</td>
                  <td className="px-6 py-4">{item?.remainingAmount}</td>
                  <td className="px-6 py-4">{item?.totalAmount}</td>
                  <td className="px-6 py-4 ">
                    <img
                      src={view}
                      alt="edit"
                      className="w-8 h-8 cursor-pointer"
                      onClick={() =>
                        navigate('/companies/bill/payment', {state:{billId:item?._id , companyId:id}})
                      }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <NoDataFound />
            )}
          </tbody>
        </table>
      </div>
      <AddBillPopup id={id} />
    </div>
  );
};

export default Bill;

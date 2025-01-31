import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import close from "../../../../../../assets/images/close.svg";
import Button from "../../../../../../components/primary-button";
import { Searchinput } from "../../../../../../components/forms/input/index";
import { useSelector } from "react-redux";
import { dispatch } from "../../../../../../redux/store/store";
import { setPayCompaniesBillModalIsOpen } from "../../../../../../redux/slices/userSlice";
import usePayAmount from "./useHook";

const PayAmount = ({ billId, companyId }) => {
  const { payCompaniesBillModalIsOpen } = useSelector((state) => state.user);
  const { payAmount } = usePayAmount();
  const [data, setData] = useState({
    description: "",
    amount: 0,
    type: "bill",
  });

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      fontSize: "2rem",
      width: "40rem",
      borderRadius: "3rem",
    },
  };

  const closeModal = () => {
    dispatch(setPayCompaniesBillModalIsOpen(false));
  };

  const handleChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateData = () => {
    payAmount(data, billId, companyId);
  };

  return (
    <Modal
      isOpen={payCompaniesBillModalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <button
        className="relative float-right text-right w-12"
        onClick={closeModal}
      >
        <img src={close} alt="img" />
      </button>
      <div className="flex flex-col items-center justify-center w-full gap-8">
        <div>
          <h2 className="text-2xl font-semibold font-inter">{"Pay Bill"}</h2>
        </div>
        <div className="flex flex-wrap flex-col w-full gap-6 mt-6 px-4">
        <div className="w-full">
            <Searchinput
              placeholder="description"
              stateValue={data.description}
              onchange={(value) => handleChange("description", value)}
            />
          </div>
          <div className="w-full">
            <Searchinput
              placeholder="Amount"
              stateValue={data.amount}
              onchange={(value) => handleChange("amount", value)}
            />
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={data.type === "bill"}
                onChange={(e) =>
                  handleChange("type", e.target.checked ? "bill" : "")
                }
              />
              <p className="text-lg">Bill From Today Cash</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={data.type === "bill from saving"}
                onChange={(e) =>
                  handleChange(
                    "type",
                    e.target.checked ? "bill from saving" : ""
                  )
                }
              />
              <p className="text-lg">Bill From Saving</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={data.type === "others"}
                onChange={(e) =>
                  handleChange("type", e.target.checked ? "others" : "")
                }
              />
              <p className="text-lg">Others</p>
            </div>
          </div>
        </div>
        <div className="w-2/5">
          <Button
            title={"Add"}
            backgroundColor="#1B473B"
            className="text-base"
            fill={true}
            onclick={updateData}
          />
        </div>
      </div>
    </Modal>
  );
};

export default PayAmount;

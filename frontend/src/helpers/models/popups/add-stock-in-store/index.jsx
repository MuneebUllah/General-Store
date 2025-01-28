import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import close from "../../../../assets/images/close.svg";
import Button from "../../../../components/primary-button";
import { Searchinput } from "../../../../components/forms/input/index";
import useHook from "./useHook";
import { useSelector } from "react-redux";
import { dispatch } from "../../../../redux/store/store";
import { setAddStorkInStore } from "../../../../redux/slices/userSlice";

const AddStockInStorePopup = () => {
  const [suggestions, setSuggestions] = useState([]); // For autocomplete suggestions
  const [type, setType] = useState(""); // Track the field being edited
  const { addStockInStoreModalIsOpen } = useSelector((state) => state.user);

  const {
    postData,
    getStoreSuggestions,
  } = useHook();

  const [data, setData] = useState({
    name: "",
    category: "",
    size: "",
    quantity: 0,
    price: 0,
    noOfItems: 0,
    weight: "",
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

  function closeModal() {
    dispatch(setAddStorkInStore(false));
  }

  const handleNameChange = (e) => {
    const selectedValue = e;
    setData((prevData) => ({ ...prevData, name: selectedValue }));
    setType("name"); // Set type to 'name'
    if (selectedValue) {
      getStoreSuggestions("name", selectedValue, setSuggestions); // Fetch suggestions for name
    } else {
      setSuggestions([]); // Clear suggestions when input is empty
    }
  };

  const handleCategoryChange = (e) => {
    const selectedValue = e;
    setData((prevData) => ({ ...prevData, category: selectedValue }));
    setType("category"); // Set type to 'category'
    if (selectedValue) {
      getStoreSuggestions("category", selectedValue, setSuggestions); // Fetch suggestions for category
    } else {
      setSuggestions([]); // Clear suggestions when input is empty
    }
  };

  const handleSizeChange = (e) => {
    const selectedValue = e;
    setData((prevData) => ({ ...prevData, size: selectedValue }));
    setType("size"); // Set type to 'size'
    if (selectedValue) {
      getStoreSuggestions("size", selectedValue, setSuggestions); // Fetch suggestions for size
    } else {
      setSuggestions([]); // Clear suggestions when input is empty
    }
  };

  const handleInputChange = (key, value) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  const selectSuggestion = (value) => {
    setData((prev) => ({
      ...prev,
      [type]: value, // Set the selected suggestion based on the current input type (name/category/size)
    }));
    setSuggestions([]); // Clear suggestions on selection
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData(data);
    setData({
      name: "",
      category: "",
      size: "",
      quantity: 0,
      price: 0,
      noOfItems: 0,
      weight: "",
    });
  };  

  return (
    <Modal
      isOpen={addStockInStoreModalIsOpen}
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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full gap-4 pt-8"
      >
        <div>
          <h2 className="text-2xl font-semibold font-inter">Add a New Stock</h2>
        </div>
        <div className="flex flex-wrap w-full gap-6 mt-6 px-8">
          <div className="flex justify-between w-full gap-4">
            <div className="w-full relative">
              <Searchinput
                placeholder="Name"
                stateValue={data?.name}
                onchange={handleNameChange}
              />
              {suggestions?.length > 0 && type === "name" && (
                <div className="absolute top-full left-0 w-full border border-gray-300 bg-white z-10 max-h-40 overflow-y-auto rounded-md shadow-md">
                  {suggestions?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => selectSuggestion(item)}
                      className="px-4 text-sm py-2 cursor-pointer hover:bg-gray-200"
                    >
                      {item?.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full relative">
              <Searchinput
                placeholder="Category"
                stateValue={data?.category}
                onchange={handleCategoryChange}
              />
              {suggestions?.length > 0 && type === "category" && (
                <div className="absolute top-full left-0 w-full border border-gray-300 bg-white z-10 max-h-40 overflow-y-auto rounded-md shadow-md">
                  {suggestions?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => selectSuggestion(item)}
                      className="px-4 text-sm py-2 cursor-pointer hover:bg-gray-200"
                    >
                      {item?.category}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between w-full gap-4">
            <Searchinput
              type="number"
              placeholder="Quantity (Cottons)"
              value={data?.quantity}
              onchange={(value) => handleInputChange("quantity", value)}
            />
            <Searchinput
              type="number"
              placeholder="Price"
              value={data?.price}
              onchange={(value) => handleInputChange("price", value)}
            />
          </div>
          <Searchinput
            placeholder="Items in a Cotton"
            type="number"
            value={data?.noOfItems}
            onchange={(value) => handleInputChange("noOfItems", value)}
          />
          <div className="flex justify-between w-full gap-4">
            <div className="w-full relative">
              <Searchinput
                placeholder="Size (optional)"
                stateValue={data?.size}
                onchange={handleSizeChange}
              />
              {suggestions?.length > 0 && type === "size" && (
                <div className="absolute top-full left-0 w-full border border-gray-300 bg-white z-10 max-h-40 overflow-y-auto rounded-md shadow-md">
                  {suggestions?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => selectSuggestion(item)}
                      className="px-4 text-sm py-2 cursor-pointer hover:bg-gray-200"
                    >
                      {item?.size}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Searchinput
              placeholder="Weight (Optional)"
              value={data?.weight}
              className="w-1/2"
              onchange={(value) => handleInputChange("weight", value)}
            />
          </div>
        </div>
        <div className="mt-6">
          <button className="w-96 bg-[#1B473B] text-white text-lg p-3 rounded-lg">
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddStockInStorePopup;

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import close from "../../../../assets/images/close.svg";
import { Searchinput } from "../../../../components/forms/input/index";
import useHook from "./useHook";
import { useSelector } from "react-redux";
import { dispatch } from "../../../../redux/store/store";
import { setAddStorkInShop } from "../../../../redux/slices/userSlice";

const AddStockInShopPopup = () => {
  const [showOtherNameInput, setShowOtherNameInput] = useState(false);
  const [showOtherCategoryInput, setShowOtherCategoryInput] = useState(false);
  const [showOtherSizeInput, setShowOtherSizeInput] = useState(false);

  const {
    postData,
    // getAllCategories,
    // getAllNames,
    // getAllSizes
  } = useHook();
  const [data, setData] = useState({
    name: "",
    category: "",
    size: "",
    quantity: 0,
    salePrice: 0,
    purchasePrice: 0,
    noOfItems: 0,
    weight: "",
  });

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState([]);
  const [size, setSize] = useState([]);
  const { addStockInShopModalIsOpen } = useSelector((state) => state.user);

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
    dispatch(setAddStorkInShop(false));
  }

  const handleNameChange = (e) => {
    const selectedValue = e.target.value;
    setData((prevData) => ({ ...prevData, name: selectedValue }));
    setShowOtherNameInput(selectedValue === "others");
  };

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setData((prevData) => ({ ...prevData, category: selectedValue }));
    setShowOtherCategoryInput(selectedValue === "others");
  };

  const handleSizeChange = (e) => {
    const selectedValue = e.target.value;
    setData((prevData) => ({ ...prevData, size: selectedValue }));
    setShowOtherSizeInput(selectedValue === "others");
  };

  const handleInputChange = (key, value) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData(data);

    // Reset flags for conditional inputs
    setShowOtherNameInput(false);
    setShowOtherCategoryInput(false);
    setShowOtherSizeInput(false);
  };

  // useEffect(() => {
  //     getAllNames(setName);
  //     getAllCategories(setCategories);
  //     getAllSizes(setSize);
  // }, [data]);

  return (
    <Modal
      isOpen={addStockInShopModalIsOpen}
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
            <div className="w-1/2">
              {/* <select
                            id="Name"
                            value={data?.name}
                            onChange={handleNameChange}
                            required
                            className="border p-4 w-full h-14 bg-gray-100 rounded-lg outline-none text-base text-gray-600"
                        >
                            <option value="">Name</option>
                            {name.map((item, index) => (
                                <option key={index} value={item.name}>{item.name}</option>
                            ))}
                            <option value="others">Others</option>
                        </select>
                        {showOtherNameInput && ( */}
              <input
                type="text"
                placeholder="Name"
                className="border p-4 w-full h-14 bg-gray-100 rounded-lg outline-none text-base text-gray-600"
                onChange={(e) =>
                  setData((prevData) => ({ ...prevData, name: e.target.value }))
                }
              />
              {/* )} */}
            </div>
            <div className="w-1/2">
              {/* <select
                            id="Category"
                            value={data.category}
                            onChange={handleCategoryChange}
                            required
                            className="border p-4 w-full h-14 bg-gray-100 rounded-lg outline-none text-base text-gray-600"
                        >
                            <option value="">Category</option>
                            {categories.map((item, index) => (
                                <option key={index} value={item.category}>{item.category}</option>
                            ))}
                            <option value="others">Others</option>
                        </select>
                        {showOtherCategoryInput && ( */}
              <input
                type="text"
                placeholder="Category"
                className="border p-4 w-full h-14 bg-gray-100 rounded-lg outline-none text-base text-gray-600"
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    category: e.target.value,
                  }))
                }
              />
              {/* )} */}
            </div>
          </div>
          <div className="flex justify-between w-full gap-4">
          <Searchinput
            type="number"
            placeholder="Quantity"
            value={data?.quantity}
            onchange={(value) => handleInputChange("quantity", value)}
          />
          <Searchinput
            placeholder="Items in a bundle (Optional)"
            type="number"
            value={data?.noOfItems}
            onchange={(value) => handleInputChange("noOfItems", value)}
          />
          </div>
          <div className="flex justify-between w-full gap-4">
            <Searchinput
              type="number"
              placeholder="Sale Price"
              value={data?.price}
              onchange={(value) => handleInputChange("salePrice", value)}
            />
            <Searchinput
              type="number"
              placeholder="Purchase Price"
              value={data?.price}
              onchange={(value) => handleInputChange("purchasePrice", value)}
            />
          </div>
          <div className="flex justify-between w-full gap-4">
            <div className="w-full flex gap-4">
              {/* <select
                            id="Size"
                            value={data.size}
                            onChange={handleSizeChange}
                            className="border p-4 w-full h-14 bg-gray-100 rounded-lg outline-none text-base text-gray-600"
                        >
                            <option value="">Size</option>
                            {size.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                            <option value="others">Others</option>
                        </select>
                        {showOtherSizeInput && ( */}
              <Searchinput
                placeholder="Size (Optional)"
                value ={data?.size}
                onChange={(e) =>
                  setData((prevData) => ({ ...prevData, size: e.target.value }))
                }
              />
              {/* )} */}
            <Searchinput
              placeholder="Weight (Optional)"
              value={data?.weight}
              onchange={(value) => handleInputChange("weight", value)}
              />
              </div>
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

export default AddStockInShopPopup;

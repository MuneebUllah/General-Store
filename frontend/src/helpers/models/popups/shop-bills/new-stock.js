import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import close from '../../../../assets/images/close.svg';
import deleteIcon from '../../../../assets/images/delete.svg';
import { useSelector } from 'react-redux';
import { setNewStockInShopModalIsOpen } from '../../../../redux/slices/userSlice';
import { dispatch } from '../../../../redux/store/store';
import useShopBilling from './useHook';

const NewStockInShopPopup = ({ id, data }) => {
    const [formData, setFormData] = useState({ items: [{ name: '', quantity: 0, price: 0 }] , discount:0 });
    const [errors, setErrors] = useState({});
    const { newStockInShopModalIsOpen } = useSelector((state) => state.user);
    const { createShopBill } = useShopBilling()

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '1.5rem',
            width: '700px',
            height: '70vh',
            borderRadius: '1rem',
        },
    };

    const handleFieldChange = (e, index, fieldName) => {
        const { value } = e.target;

        setFormData((prev) => {
            if(fieldName === 'discount'){
                return {...prev , discount :Number( value)}
            }
            else{

                const updatedItems = [...prev.items];
                updatedItems[index][fieldName] =
                fieldName === "quantity" || fieldName === "price" ? Number(value) : value; // Convert to number for quantity and price        
                return { ...prev, items: updatedItems };
            }
        });
    };

    const handleAddRow = () => {
        setFormData((prev) => ({
            ...prev,
            items: [...prev.items, { name: '', quantity: 0, price: 0 }],
        }));
    };

    const handleRemoveRow = (index) => {
        setFormData((prev) => {
            const updatedItems = [...prev.items];
            updatedItems.splice(index, 1);
            return { ...prev, items: updatedItems };
        });
    };

    //   const validateForm = () => {
    //     const newErrors = {};

    //     formData.items.forEach((item, index) => {
    //       Object.keys(item).forEach((key) => {
    //         const value = item[key];

    //         // Check if the value is a string or number and validate accordingly
    //         if (
    //           (typeof value === "string" && !value.trim()) || // String field is empty
    //           (typeof value === "number" && isNaN(value))    // Number field is NaN
    //         ) {
    //           newErrors[`${key}_${index}`] = `Field ${key.replace('field', '')} in row ${index + 1} is required`;
    //         }
    //       });
    //     });

    //     setErrors(newErrors);
    //     return Object.keys(newErrors).length === 0;
    //   };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        createShopBill(formData)
        // if (validateForm()) {

        // }
    };

    const closeModal = () => {
        dispatch(setNewStockInShopModalIsOpen(false));
    };

    return (
        <Modal
            isOpen={newStockInShopModalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Shop Bills Modal"
        >
            <button className="absolute top-4 right-4 bg-transparent" onClick={closeModal}>
                <img src={close} alt="Close" className="w-6 h-6" />
            </button>
            <form className="p-6 overflow-y-auto h-full" onSubmit={handleSubmit}>
                <h1 className="text-center text-2xl font-semibold mb-6">Shop Bills</h1>
                <div className='w-full flex flex-col'>
                    <div className=' items-center flex gap-4'>
                        <h1 className='w-40 flex-grow p-2'>Name</h1>
                        <h1 className='w-20 flex-grow p-2 '>Quantity</h1>
                        <h1 className='w-28 flex-grow p-2'>Price</h1>
                    </div>
                    <div className="space-y-4">
                        {formData.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <input
                                    type="text"
                                    value={item.name}
                                    required
                                    onChange={(e) => handleFieldChange(e, index, 'name')}
                                    placeholder={`Name (item ${index + 1})`}
                                    className="flex-grow border border-gray-300 rounded-lg p-2 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="number"
                                    value={item.quantity}
                                    required
                                    onChange={(e) => handleFieldChange(e, index, 'quantity')}
                                    placeholder={`Quantity (item ${index + 1})`}
                                    className="flex-grow border border-gray-300 rounded-lg p-2 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="number"
                                    value={item.price}
                                    required
                                    onChange={(e) => handleFieldChange(e, index, 'price')}
                                    placeholder={`Price (item ${index + 1})`}
                                    className="flex-grow border border-gray-300 rounded-lg p-2 w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveRow(index)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                >
                                    <img src={deleteIcon} alt="Delete" className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        <div className='w-full flex gap-4'>
                            <input
                                type="number"
                                value={formData.discount}
                                onChange={(e) => handleFieldChange(e,null, 'discount')}
                                placeholder={0}
                                className="flex-grow border border-gray-300 rounded-lg p-2 w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={handleAddRow}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                            >
                                + Add Row
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <button className="w-3/5 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600" >
                        {id ? 'Add' : 'Edit'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default NewStockInShopPopup;

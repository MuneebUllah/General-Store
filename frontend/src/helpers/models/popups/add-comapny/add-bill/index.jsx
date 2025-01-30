import React, { useState } from 'react';
import Modal from 'react-modal';
import close from '../../../../../assets/images/close.svg';
import Button from '../../../../../components/primary-button/index';
import { Searchinput } from '../../../../../components/forms/input/index';
import useHook from './useHook';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../../../redux/store/store';
import { setAddBillModalIsOpen } from '../../../../../redux/slices/userSlice';

const AddBillPopup = ({ id }) => {
    const { addBillModalIsOpen } = useSelector((state) => state.user);
    const { createNewBill , getBillSuggestions} = useHook();
    const [data, setData] = useState({
        billName: '',
        invoiceNumber:0,
        totalAmount:0,
    });
    const [suggestions, setSuggestions] = useState([]); // For autocomplete suggestions

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '2rem',
            width: '40rem',
            borderRadius: '3rem',
        },
    };

    function closeModal() {
        dispatch(setAddBillModalIsOpen(false));
    }

    const handleChange = (field, value) => {
        setData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Fetch suggestions if the field is 'name'
        if (field === 'name') {
            // fetchSuggestions(value);
            getBillSuggestions(value , setSuggestions)
        }
    };


    const selectSuggestion = (value) => {
        setData((prev) => ({
            ...prev,
            name: value,
        }));
        setSuggestions([]); // Clear suggestions on selection
    };


    const updateData = (e) => {
        e.preventDefault()
        createNewBill(id , data);
    };

    return (
        <Modal
            isOpen={addBillModalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <button className='relative float-right text-right w-12' onClick={closeModal}>
                <img src={close} alt="img" />
            </button>
            <form onSubmit={updateData} className='flex flex-col items-center justify-center w-full gap-8'>
                <div>
                    <h2 className='text-2xl font-semibold font-inter'>{'Add New Bill'}</h2>
                </div>
                <div className='flex flex-wrap flex-col w-full gap-6 mt-6 px-4'>
                <div className='w-full relative'>
                        <Searchinput
                            placeholder='Name'
                            stateValue={data?.name}
                            onchange={(value) => handleChange('billName', value)}
                        />
                        {suggestions.length > 0 && (
                            <div
                                className="absolute top-full left-0 w-full border border-gray-300 bg-white z-10 max-h-40 overflow-y-auto rounded-md shadow-md"
                            >
                                {suggestions.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => selectSuggestion(item?.name)}
                                        className="px-4 text-sm py-2 cursor-pointer hover:bg-gray-200"
                                    >
                                        {item?.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className='w-full'>
                        <Searchinput
                            placeholder='Invoice'
                            stateValue={data?.invoice}
                            onchange={(value) => handleChange('invoiceNumber', value)}
                        />
                    </div>
                    <div className='w-full'>
                        <Searchinput
                            placeholder='Total Amount'
                            stateValue={data?.totalAmount}
                            onchange={(value) => handleChange('totalAmount', value)}
                        />
                    </div>
                </div>
                <div className='w-2/5'>
                    <Button
                        title={'Add'}
                        backgroundColor='#1B473B'
                        className='text-base'
                        fill={true}
                    />
                </div>
            </form>
        </Modal>
    );
};

export default AddBillPopup;

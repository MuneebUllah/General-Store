import React, { useState } from 'react';
import Modal from 'react-modal';
import close from '../../../../assets/images/close.svg';
import Button from '../../../../components/primary-button';
import { Searchinput } from '../../../../components/forms/input/index';
import useHook from './useHook';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../../redux/store/store';
import { setAddCreditModalIsOpen } from '../../../../redux/slices/userSlice';

const AddCreditPopup = () => {
    const { addCreditModalIsOpen } = useSelector((state) => state.user);
    const { createCreditAccount } = useHook()
    const [data, setData] = useState({
        name: '',
        totalAmount: 0,
        phone:0,
        description:''
    });

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
            borderRadius: '3rem'
        },
    };

    function closeModal() {
        dispatch(setAddCreditModalIsOpen(false))
    }

    const handleChange = (field, value) => {
        setData((prev) => ({
            ...prev,
            [field]: value
        }));
        
    };

    const updateData = () => {
        createCreditAccount(data)
    }    

    return (
        <Modal
            isOpen={addCreditModalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <button className='relative float-right text-right w-12' onClick={closeModal}>
                <img src={close} alt="img" />
            </button>
            <div className='flex flex-col items-center justify-center w-full gap-8'>
                <div>
                    <h2 className='text-2xl font-semibold font-inter'>{'Add New Account'}</h2>
                </div>
                <div className='flex flex-wrap w-full gap-4 mt-6 px-4'>
                <div className='w-[47%]'>
                    <label className='text-sm'>Name</label>
                        <Searchinput 
                            placeholder='Name' 
                            stateValue={data?.name} 
                            onchange={(value) => handleChange('name', value)} 
                        />
                    </div>
                    <div className='w-[47%]'>
                    <label className='text-sm'>Amount</label>
                        <Searchinput 
                        type={'number'}
                            placeholder='Amount' 
                            stateValue={data?.totalAmount} 
                            onchange={(value) => handleChange('totalAmount', value)} 
                        />
                    </div>
                    <div className='w-[47%]'>                    
                        <label className='text-sm'>Phone Number</label>
                        <Searchinput 
                        type={'number'}
                            placeholder='Phone Number' 
                            stateValue={data?.phone} 
                            onchange={(value) => handleChange('phone', value)} 
                        />
                    </div>
                    <div className='w-[47%]'>
                    <label className='text-sm'>{'Description (Optional)'}</label>
                    <Searchinput 
                            placeholder='Description' 
                            stateValue={data?.description} 
                            onchange={(value) => handleChange('description', value)} 
                        />
                    </div>
                    
                </div>
                <div className='w-2/5'>
                    <Button 
                        title={'Add'} 
                        backgroundColor='#1B473B' 
                        className='text-base' 
                        fill={true} 
                        onclick={updateData}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default AddCreditPopup;

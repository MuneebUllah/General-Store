import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import close from '../../../../assets/images/close.svg';
import Button from '../../../../components/primary-button';
import { Searchinput } from '../../../../components/forms/input/index';
import useHook from './useHook';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../../redux/store/store';
import { setRetailerModalIsOpen } from '../../../../redux/slices/userSlice';

const RetailerPopup = ({ modalIsOpen, id }) => {
    const [data, setData] = useState(null);
    const { dataById , addDataById , removeDataById } = useHook();
    const { retailerModalIsOpen } = useSelector((state) => state.user);

    const [searchQuery, setSearchQuery] = useState({
        name: '',
        category: '',
        price: 0,
        noOfItems: 8,
        size:'',
        quantity:0,
        weight:'',
    });

    useEffect(() => {
        if (id) {
            dataById(id, setData);
        }
    }, [id]);

    useEffect(() => {
        if (data) {
            setSearchQuery({
                name: data?.name || '',
                category: data?.category || '',
                price: data?.price || 0,
                noOfItems: data?.noOfItems || 8,
                size:data?.size || '',
            });
        }
    }, [data]);

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
        dispatch(setRetailerModalIsOpen(false))
    }

    const handleChange = (field, value) => {
        setSearchQuery((prev) => ({
            ...prev,
            [field]: value
        }));
        
    };

    const updateData = () => {
        if(modalIsOpen == '+'){
            addDataById(id , searchQuery)        
        }
        else{
            removeDataById(id , searchQuery)        

        }
    }    

    return (
        <Modal
            isOpen={retailerModalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <button className='relative float-right text-right w-12' onClick={closeModal}>
                <img src={close} alt="img" />
            </button>
            <div className='flex flex-col items-center justify-center w-full gap-8'>
                <div>
                    <h2 className='text-2xl font-semibold font-inter'>{modalIsOpen === '+' ? 'Add To Store': 'Remove From Store'}</h2>
                </div>
                <div className='flex flex-wrap w-full gap-6 mt-6 px-4'>
                    <div className='w-[46%]'>
                        <Searchinput 
                            placeholder='Name' 
                            stateValue={searchQuery?.name} 
                            onchange={(value) => handleChange('name', value)} 
                            disabled 
                        />
                    </div>
                    <div className='w-[46%]'>
                        <Searchinput 
                            placeholder='Category' 
                            stateValue={searchQuery?.category} 
                            onchange={(value) => handleChange('category', value)} 
                            disabled 
                        />
                    </div>
                    <div className='w-[46%]'>
                        <Searchinput 
                            placeholder='Size (optional)' 
                            stateValue={searchQuery?.size} 
                            onchange={(value) => handleChange('noOfItems', value)} 
                            disabled 
                        />
                    </div>
                    <div className='w-[46%]'>
                        <Searchinput 
                            placeholder='Weight (optional)' 
                            stateValue={searchQuery?.weight} 
                            onchange={(value) => handleChange('noOfItems', value)} 
                            disabled 
                        />
                    </div>
                    <div className='w-[97%]'>
                        <Searchinput 
                            type='number' 
                            placeholder='Quantity' 
                            stateValue={searchQuery?.quantity} 
                            onchange={(value) => handleChange('quantity', value)} 
                        />
                    </div>
                    <div className='w-[46%]'>
                        <Searchinput 
                            placeholder='Price' 
                            stateValue={searchQuery?.price} 
                            onchange={(value) => handleChange('price', value)} 
                            disabled 
                        />
                    </div>
                    <div className='w-[46%]'>
                        <Searchinput 
                            placeholder='No. of Items In a Cotton' 
                            stateValue={searchQuery?.noOfItems} 
                            onchange={(value) => handleChange('noOfItems', value)} 
                            disabled 
                        />
                    </div>
                    
                </div>
                <div className='w-2/5'>
                    <Button 
                        title={modalIsOpen === '+' ? 'Add' :"Edit" } 
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

export default RetailerPopup;

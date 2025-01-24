import React, { useState } from 'react';
import Modal from 'react-modal';
import close from '../../../../assets/images/close.svg';
import Button from '../../../../components/primary-button';
import { Searchinput } from '../../../../components/forms/input/index';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../../redux/store/store';
import { setPayCreditModalIsOpen } from '../../../../redux/slices/userSlice';
import usePayCreditAmount from './useHook';

const PayCreditAmount = ({ id }) => {
    const { payCreditAmountModalIsOpen } = useSelector((state) => state.user);
    const { payAmount } = usePayCreditAmount();
    const [data, setData] = useState({
        description: '',
        paidAmount: 0,
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

    const closeModal = () => {
        dispatch(setPayCreditModalIsOpen(false));
    };

    const handleChange = (field, value) => {
        setData((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const updateData = () => {
        payAmount(data , id);
    };

    return (
        <Modal
            isOpen={payCreditAmountModalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <button className='relative float-right text-right w-12' onClick={closeModal}>
                <img src={close} alt="img" />
            </button>
            <div className='flex flex-col items-center justify-center w-full gap-8'>
                <div>
                    <h2 className='text-2xl font-semibold font-inter'>{'Pay Bill'}</h2>
                </div>
                <div className='flex flex-wrap flex-col w-full gap-6 mt-6 px-4'>
                    <div className='w-full'>
                        <Searchinput
                            placeholder='Description (optional)'
                            stateValue={data.description}
                            onchange={(value) => handleChange('description', value)}
                        />
                    </div>
                    <div className='w-full'>
                        <Searchinput
                            placeholder='Amount'
                            stateValue={data.paidAmount}
                            onchange={(value) => handleChange('paidAmount', value)}
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

export default PayCreditAmount;

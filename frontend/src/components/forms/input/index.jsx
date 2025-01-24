import { FC, useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import email from '../../../assets/images/mail.svg';
import password from '../../../assets/images/lock.svg';


export const Textinput = ({ placeholder, onchange, stateValue }) => {
    return (
        <div className="flex items-center p-4 gap-2 bg-gray-100 rounded-lg w-full h-14">
            <img src={email} alt="img" width={20} />
            <input
                type="text"
                placeholder={placeholder}
                onChange={(e) => onchange(e.target.value)}
                value={stateValue}
                className="w-11/12 outline-none text-base text-gray-600 bg-transparent"
            />
        </div>
    );
};

export const Searchinput = ({ placeholder, onchange, stateValue , type , disabled}) => {
    return (
        <input
            type={type ? type : 'text'}
            placeholder={placeholder}
            onChange={(e) => onchange(e.target.value)}
            value={stateValue}
            className="p-4 w-full h-14 bg-gray-100 border-[1px] border-solid border-[#E2E8F0] rounded-lg outline-none text-base text-gray-600"
            disabled={disabled ? true : false}
        />
    );
};

export const IconInput = ({ placeholder, onchange, stateValue }) => {
    const [inputType, setInputType] = useState<'text' | 'password'>('password');

    const handleInputTypeChange = () => {
        setInputType(prevType => (prevType === 'text' ? 'password' : 'text'));
    };

    return (
        <div className="flex items-center p-4 gap-2 bg-gray-100 rounded-lg w-full h-14">
            <img src={password} alt="img" width={25} height={25} />
            <input
                type={inputType}
                placeholder={placeholder}
                onChange={(e) => { onchange(e.target.value) }}
                value={stateValue}
                className="w-10/12 outline-none text-base text-gray-600 bg-transparent"
            />
            <div onClick={handleInputTypeChange} className="cursor-pointer">
                {inputType === 'password' ? (
                    <FaRegEyeSlash size={18} color='#808D9E' />
                ) : (
                    <FaRegEye size={18} color='#808D9E' />
                )}
            </div>
        </div>
    );
};

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import close from '../../../../assets/images/close.svg';
import deleteIcon from '../../../../assets/images/delete.svg';
import { useSelector } from 'react-redux';
import { setNewBillModalIsOpen } from '../../../../redux/slices/userSlice';
import { dispatch } from '../../../../redux/store/store';

const ShopBillsPopup = ({ id, data }) => {
  const [formData, setFormData] = useState({ items: [{ field1: '', field2: '', field3: '' }], amount: 0 });
  const [errors, setErrors] = useState({});
  const { newBillModalIsOpen } = useSelector((state) => state.user);

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

  useEffect(() => {
    if (data && id !== 0) {
      setFormData({ ...data, items: data.items || [{ field1: '', field2: '', field3: '' }] });
    }
  }, [data, id]);

  const handleFieldChange = (e, index, fieldName) => {
    const { value } = e.target;
    setFormData((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[index][fieldName] = value;
      return { ...prev, items: updatedItems };
    });
  };

  const handleAddRow = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { field1: '', field2: '', field3: '' }],
    }));
  };

  const handleRemoveRow = (index) => {
    setFormData((prev) => {
      const updatedItems = [...prev.items];
      updatedItems.splice(index, 1);
      return { ...prev, items: updatedItems };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    formData.items.forEach((item, index) => {
      Object.keys(item).forEach((key) => {
        if (!item[key].trim()) {
          newErrors[`${key}_${index}`] = `Field ${key.replace('field', '')} in row ${index + 1} is required`;
        }
      });
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (id) {
        console.log('Updating dietary choice:', formData);
        // Call update API here
      } else {
        console.log('Creating new dietary choice:', formData);
        // Call create API here
      }
      dispatch(setNewBillModalIsOpen(false));
    }
  };

  const closeModal = () => {
    dispatch(setNewBillModalIsOpen(false));
  };

  return (
    <Modal
      isOpen={newBillModalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Shop Bills Modal"
    >
      <button className="absolute top-4 right-4 bg-transparent" onClick={closeModal}>
        <img src={close} alt="Close" className="w-6 h-6" />
      </button>
      <form className="p-6 overflow-y-auto h-full" onSubmit={(e) => e.preventDefault()}>
        <h1 className="text-center text-2xl font-semibold mb-6">Shop Bills</h1>
        <div className="space-y-4">
          {formData.items.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <input
                type="text"
                value={item.field1}
                onChange={(e) => handleFieldChange(e, index, 'field1')}
                placeholder={`Field 1 (Row ${index + 1})`}
                className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={item.field2}
                onChange={(e) => handleFieldChange(e, index, 'field2')}
                placeholder={`Field 2 (Row ${index + 1})`}
                className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={item.field3}
                onChange={(e) => handleFieldChange(e, index, 'field3')}
                placeholder={`Field 3 (Row ${index + 1})`}
                className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <button
            type="button"
            onClick={handleAddRow}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            + Add Row
          </button>
        </div>
        <div className="mt-6">
          <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600" onClick={handleSubmit}>
            {id === 0 ? 'Add' : 'Edit'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ShopBillsPopup;

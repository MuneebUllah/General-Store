import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import close from '../../../../assets/images/close.svg';
import deleteIcon from '../../../../assets/images/delete.svg';

const ShopBillsPopup = ({ id, data }) => {
  const [formData, setFormData] = useState({ name: '', quantity: [0], amount: 0 });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setFormData({ ...data, quantity: data.quantity || [''] });
    }
  }, [data, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionsChange = (e, index) => {
    const { value } = e.target;
    setFormData((prev) => {
      const updatedOptions = [...prev.quantity];
      updatedOptions[index] = value;
      return { ...prev, quantity: updatedOptions };
    });
  };

  const handleAddOption = () => {
    setFormData((prev) => ({ ...prev, quantity: [...prev.quantity, ''] }));
  };

  const handleRemoveOption = (index) => {
    setFormData((prev) => {
      const updatedOptions = [...prev.quantity];
      updatedOptions.splice(index, 1);
      return { ...prev, quantity: updatedOptions };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.question.trim()) newErrors.question = 'Question is required';
    formData.quantity.forEach((option, index) => {
      if (!option.trim()) newErrors[`option_${index}`] = `Answer ${index + 1} is required`;
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
      setIsModalOpen(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Dietary Choice Modal"
    >
      <button
        className="absolute top-4 right-4 bg-transparent"
        onClick={closeModal}
      >
        <img src={close} alt="Close" className="w-6 h-6" />
      </button>
      <div className="p-6 overflow-y-auto h-full">
        <h1 className="text-center text-2xl font-semibold mb-6">Dietary Choice</h1>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="Question"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.question && <p className="text-red-500 text-sm">{errors.question}</p>}
          </div>
          <div>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="amount"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {formData.quantity.map((option, index) => (
            <div key={index} className="flex items-center gap-4">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionsChange(e, index)}
                placeholder={`Answer ${index + 1}`}
                className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {index === 0 ? (
                <button
                  onClick={handleAddOption}
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  + Add
                </button>
              ) : (
                <button
                  onClick={() => handleRemoveOption(index)}
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  <img src={deleteIcon} alt="Delete" className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
          >
            {id === 0 ? 'Add' : 'Edit'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ShopBillsPopup;

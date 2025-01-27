import { useEffect, useState } from 'react';
import NoDataFound from '../../components/no-data-found/index';
import Button from '../../components/primary-button/index';
import { Searchinput } from '../../components/forms/input/index';
import useHook from './useHook';
import view from '../../assets/images/view-icon.svg'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setAddStorkInStore } from '../../redux/slices/userSlice';
import { dispatch } from '../../redux/store/store';
import AddStockInStorePopup from '../../helpers/models/popups/add-stock-in-store';

const AvailableStock = () => {
  const [categories, setCategories] = useState([])
  const [searchCategory, setSearchCategory] = useState('');
  const { getAllCategories, searchByCategory } = useHook()
  const navigate = useNavigate()
  const { addStockInStoreModalIsOpen} = useSelector(state => state?.user)

  const search = (type) => {
    if (type) {
      searchByCategory(searchCategory, setCategories)
    } else {
      getAllCategories(setCategories)
    }
  };


  useEffect(() => {
    getAllCategories(setCategories)
  }, [addStockInStoreModalIsOpen])

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Categories Type</h1>
        <button 
          width="16rem" 
          className='bg-[#00B087] text-white w-[10rem] h-12 cursor-pointer text-center text-base inline-block px-4 py-2 rounded-lg'
          onClick={() => {         
            dispatch(setAddStorkInStore(true))}} >Add Stock</button>
      </div>

      <div className="mb-6 flex gap-8 justify-between items-center">
        <div className="w-3/4">
          <Searchinput
            placeholder="Search By Category"
            onchange={(value) => setSearchCategory(value)}
            value={searchCategory}
          />
        </div>
        <div className="flex w-3/12 space-x-4">
          <Button title="Search" width="16rem" fill={true} onclick={() => search(true)} />
          <Button
            title="Reset"
            width="16rem"
            backgroundColor="#E4774F"
            fill={true}
            onclick={() => search(false)}
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Image</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Category Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">No. of Items</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Total Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.length > 0 ? (
              categories.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex gap-4 items-center">
                      <img
                        src="https://picsum.photos/300"
                        alt="img"
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.count}</td>
                  <td className="px-6 py-4">{item.totalAmount}</td>
                  <td className="px-6 py-4 ">
                    <img src={view} alt="edit" className="w-8 h-8 cursor-pointer" onClick={() => navigate('/store/category', { state: item.category })} />                  </td>
                </tr>
              ))
            ) : (
              <NoDataFound />
            )}
          </tbody>
        </table>
      </div>
      <AddStockInStorePopup />
    </div>
  );
};

export default AvailableStock;

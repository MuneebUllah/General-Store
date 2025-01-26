import { useEffect, useState } from 'react';
import { Searchinput } from '../../components/forms/input';
import NoDataFound from '../../components/no-data-found';
import  Button  from '../../components/primary-button'
import useTodayTotalCalc from './useHook';
import { dispatch } from '../../redux/store/store';
import { setPayBillModalIsOpen } from '../../redux/slices/userSlice';
import PayBillPopup from '../../helpers/models/popups/pay-bill';
import { useSelector } from 'react-redux';
import moment from 'moment';

const TodayTotalCalc = () => {
    const [data , setData] = useState([])
    const [searchQuery , setSearchQuery] = useState({
      name:'',
      date:''
    })
    const { getUpdatedBills , searchTodayCalc , totalSaving} = useTodayTotalCalc()
    const { payBillModalIsOpen } = useSelector((state) => state.user);
    useEffect(() =>{ getUpdatedBills(setData) , totalSaving()} , [ payBillModalIsOpen ])

    const search = (type) => {
      if(type){
        searchTodayCalc(searchQuery , setData)
      }
      else{
        getUpdatedBills(setData) 
      }
    }

    const date = moment(new Date()).format('DD/MM/YYYY')

    console.log(data);
    
    return(
        <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">{date}</h1>
  
          <button 
          width="16rem" 
          className='bg-[#00B087] text-white w-[10rem] h-12 cursor-pointer text-center text-base inline-block px-4 py-2 rounded-lg'
          onClick={() => {         
            dispatch(setPayBillModalIsOpen(true))}} >Pay Bill</button>
        </div>
  
        <div className="mb-6 flex gap-8 justify-between items-center">
          <div className="w-3/4 flex gap-4">
            <Searchinput
              placeholder="Search By Name"
              onchange={(value) => setSearchQuery({...searchQuery ,  name:value})}
              value={searchQuery.name}
            />
            <Searchinput
            type='date'
              placeholder="Search By Date"
              onchange={(value) => setSearchQuery({...searchQuery ,  date:value})}
              value={searchQuery.date}
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
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Paid Amount</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Type</th>
              </tr>
            </thead>
            <tbody>
              {data?.todayTotalCash?.length > 0 ? (
                data?.todayTotalCash?.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{item?.name}</td>
                    <td className="px-6 py-4">{item?.amount}</td>
                    <td className="px-6 py-4">{item?.type}</td>
                  </tr>
                ))
              ) : (
                <NoDataFound />
              )}
              </tbody>
          </table>
              <div className='flex justify-between w-full px-6 py-3'>
                <h1 className='text-2xl font-semibold'>Total Cash</h1>
                <h1 className='text-2xl font-semibold'>{data?.totalCash}</h1>
              </div>
        </div>
        <PayBillPopup />
      </div>
    )
}

export default TodayTotalCalc;
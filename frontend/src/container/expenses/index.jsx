import { useEffect, useState } from "react";
import NoDataFound from "../../components/no-data-found";
import Button from "../../components/primary-button";
import AddExpensesPopup from "../../helpers/models/popups/add-expenses";
import useExpense from "./useHook";
import { dispatch } from "../../redux/store/store";
import { setAddExpensesModalIsOpen } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { Searchinput } from "../../components/forms/input";

const Expenses = () => {
    const [data, setData] = useState([]);
    const [date , setDate] = useState('')
    const { getExpenses , searchExpensesByDate} = useExpense()
    const {addExpensesModalIsOpen } = useSelector(state => state.user)

    useEffect(() => {getExpenses(setData)} , [addExpensesModalIsOpen])
    console.log(data);

    const search = (type) =>{
      if(type){
        searchExpensesByDate(date , setData)
      }
      else{
        getExpenses(setData)
      }
    }

    return(
        <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">{'Expenses'}</h1>
  
          <button 
          width="16rem" 
          className='bg-[#00B087] text-white w-[10rem] h-12 cursor-pointer text-center text-base inline-block px-4 py-2 rounded-lg'
          onClick={() => {         
            dispatch(setAddExpensesModalIsOpen(true))}} >Add Expenses</button>
        </div>

        <div className="mb-6 flex gap-8 justify-between items-center">
          <div className="w-3/4">
            <Searchinput
            type='date'
              placeholder="Search By Date"
              onchange={(value) => setDate(value)}
              value={date}
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
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Description</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.length > 0 ? (
                data?.data?.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{item?.name}</td>
                    <td className="px-6 py-4">{item?.amount}</td>
                    <td className="px-6 py-4">{item?.description}</td>
                  </tr>
                ))
              ) : (
                <NoDataFound />
              )}
            </tbody>
          </table>
          <div className='flex justify-between w-full px-6 py-3'>
                <h1 className='text-2xl font-semibold'>Total Expense</h1>
                <h1 className='text-2xl font-semibold'>{data?.totalExpense}</h1>
              </div>
        </div>
        <AddExpensesPopup />
      </div>
    )
}

export default Expenses;
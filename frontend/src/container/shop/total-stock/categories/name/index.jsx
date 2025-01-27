import { useState } from "react";
import NoDataFound from "../../../../../components/no-data-found";

const NameDataInShop = () => {
    const [data , setData] = useState([])
    return(
        <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">{data[0]?.name}</h1>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Image</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Quantity</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">No. of Items In Cotton</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Price</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Size</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Weight</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Total Amount</th>
                {/* <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 h-auto">
                    <td className="px-6 py-4">
                      <div className="flex gap-4 items-center">
                        <img
                          src="https://picsum.photos/300"
                          alt="img"
                          className=" max-w-12 w-12 h-12 object-cover rounded-full"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">{item?.quantity ? item?.quantity : 0}</td>
                    <td className="px-6 py-4">{item?.noOfItems ? item?.noOfItems : 0}</td>
                    <td className="px-6 py-4">{item?.price ? item?.price : 0}</td>
                    <td className="px-6 py-4">{item?.size}</td>
                    <td className="px-6 py-4">{item?.weight}</td>
                    <td className="px-6 py-4">{item?.totalAmount}</td>
                    {/* <td className="px-6 py-4 flex gap-2 items-stretch h-full">
                      <div
                        className="bg-[#1B473B] cursor-pointer w-10 h-7 rounded-lg text-white text-center flex items-center justify-center"
                        onClick={() => openPopup(item?._id, '+')}
                      >
                        +
                      </div>
                      <div
                        className="bg-[#1B473B] w-10 cursor-pointer h-7 rounded-lg text-white text-center flex items-center justify-center"
                        onClick={() => openPopup(item?._id, '-')}
                      >
                        -
                      </div>
                    </td> */}
                    </tr>
                ))
              ) : (
                <NoDataFound />
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
}

export default NameDataInShop;
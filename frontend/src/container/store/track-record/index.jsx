import { useEffect, useState } from "react";
import NoDataFound from "../../../components/no-data-found";
import useHook from "./useHook";
import { Searchinput } from "../../../components/forms/input";
import Button from "../../../components/primary-button";
import moment from "moment";

const TrackRecord = () => {
  const [data, setData] = useState([]);
  const { getHistory , searchName } = useHook();
  const [name, setName] = useState('');

  const search = (type) => {
    if (type) {
      searchName(name, setData);
    } else {
      getHistory(setData)
    }
  };

  useEffect(() => { getHistory(setData) }, [])

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">{'History'}</h1>
      </div>

      <div className="mb-6 flex gap-8 justify-between items-center">
        <div className="w-3/4">
          <Searchinput
            placeholder="Search By Name"
            onchange={(value) => setName( value)}
            value={name}
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
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Quantity</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Size</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Weight</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Time</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 h-auto">
                  <td className="px-6 py-4">{item?.name}</td>
                  <td className="px-6 py-4">{item?.quantity ? item?.quantity : 0}</td>
                  <td className="px-6 py-4">{item?.size}</td>
                  <td className="px-6 py-4">{item?.weight}</td>
                  <td className="px-6 py-4">{moment(item?.timestamp).format('DD/MM hh:mm')}</td>
                  <td className="px-6 py-4 ">
                    {item?.action == 'create' ? 'Added' : item?.action == 'add' ? 'Added' : 'Removed'}
                  </td>
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

export default TrackRecord;
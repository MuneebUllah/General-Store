import { useEffect, useState } from "react";
import useBillDetail from "./useHook";
import { useParams } from "react-router-dom";
import NoDataFound from "../../../../components/no-data-found";

const BillDetail = () => {
    const [data, setData] = useState(null); // Initialize as null to handle loading state
    const { getShopBillById } = useBillDetail();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getShopBillById(id, setData); // Fetch data when id is available
        }
    }, [id]);

    // Show loading message if data is null or undefined
    if (!data) {
        return <div className="text-center text-xl font-semibold">Loading...</div>;
    }

    // Calculate grandTotal, discount, and finalTotal
    const grandTotal = data.items.reduce((total, item) => total + item.totalAmount, 0);
    const discount = data.discount || 0;
    const finalTotal = grandTotal - discount < 0 ? 0 : grandTotal - discount;

    // Function to handle printing only the specific div
    const handlePrint = () => {
        window.print()
    };

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="flex print-container justify-center items-center flex-col p-4 bg-white shadow-lg rounded-lg w-3/4 relative">
                {/* Watermark */}
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-0">
                    <span className="text-[4rem] font-bold text-gray-300 transform rotate-[-35deg] absolute top-[40%] left-[20%] transform-translate-x-1/2 -translate-y-1/2">
                        Mansoor Irani Center
                    </span>
                </div>

                <h1 className="text-2xl font-bold mb-4 text-center z-10">Mansoor Irani Center</h1>
                <div className="w-full border-b border-gray-300 mb-4 z-10"></div>

                {/* Printable Content */}
                <div id="printable-content" className="w-full mb-4 z-10">
                    <div className="grid grid-cols-6 gap-4 text-start font-semibold">
                        <div className="col-span-1">#</div>
                        <div className="col-span-2">Name</div>
                        <div>Quantity</div>
                        <div>Price</div>
                        <div>Total</div>
                    </div>
                    <div className="w-full border-b border-gray-300 mb-4"></div>
                    {
                        data?.items?.length > 0 ? (
                            data.items.map((item, index) => (
                                <div key={index} className="grid grid-cols-6 gap-4 items-center py-2">
                                    <div>{index + 1}</div>
                                    <div className="col-span-2">{item?.name}</div>
                                    <div>{item?.quantity}</div>
                                    <div>{item?.price}</div>
                                    <div>{item?.totalAmount}</div>
                                </div>
                            ))
                        ) : <NoDataFound />
                    }
                </div>

                {/* GrandTotal, Discount, and Final Total */}
                <div className="w-full border-b border-gray-300 mb-4 z-10"></div>
                <div className="w-full text-right mt-4 z-10">
                    <div className="flex justify-between text-lg font-semibold mb-2">
                        <span>Total</span>
                        <span>{grandTotal.toFixed(2)} PKR</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold mb-2">
                        <span>Discount</span>
                        <span>{discount.toFixed(2)} PKR</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold">
                        <span>Amount To Pay</span>
                        <span>{finalTotal.toFixed(2)} PKR</span>
                    </div>
                </div>

                {/* Print Button */}
                <div className="mt-6 relative z-50 no-print">
                    <button
                        onClick={handlePrint}
                        className="bg-blue-500 text-white py-2 px-4 cursor-pointer rounded-lg hover:bg-blue-700 print-button"
                    >
                        Print Bill
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BillDetail;

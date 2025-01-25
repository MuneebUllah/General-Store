import { useEffect, useState } from "react";
import useDetailPaidAmount from "./useHook";
import { useLocation } from "react-router-dom";
import { dispatch } from "../../../redux/store/store";
import { setPayCreditModalIsOpen } from "../../../redux/slices/userSlice";
import PayCreditAmount from "../../../helpers/models/popups/pay-credit-amount";
import NoDataFound from "../../../components/no-data-found";
import moment from "moment";
import { useSelector } from "react-redux";

const CreditDetail = () => {
    const [data, setData] = useState([]);
    const location = useLocation();
    const id = location.state;

    const { getPaidDetail } = useDetailPaidAmount();
    const { payCreditAmountModalIsOpen } = useSelector(state => state.user)

    useEffect(() => {
        getPaidDetail(id, setData);
    }, [id , payCreditAmountModalIsOpen]);

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-semibold">{data?.name}</h1>

                <button
                    className='bg-[#00B087] text-white w-[10rem] h-12 cursor-pointer text-center text-base inline-block px-4 py-2 rounded-lg'
                    onClick={() => {
                        dispatch(setPayCreditModalIsOpen(true))
                    }}
                >
                    Pay Amount
                </button>
            </div>

            <div className="flex items-center flex-col justify-center">
                {/* Display Total Amount */}
                <div className="flex items-center w-5/6 flex-col mb-2">
                    <div className="flex w-full justify-between gap-8">
                        <h1 className="text-2xl font-semibold">Total Amount</h1>
                        <div className="text-2xl">{data?.totalAmount}</div>
                    </div>
                </div>

                {data?.details?.length > 0 ?
                    data?.details?.map((item, index) => (
                        <div className="flex items-center w-5/6 flex-col mb-2" key={index}>
                            {/* Display Paid Amount with Date */}
                            <div className="flex w-full justify-between gap-8">
                                <h1 className="text-2xl font-semibold w-64">{item?.description}</h1>
                                <h1 className="text-2xl font-semibold">{moment(item?.createdAt).format('DD/MM/YYYY')}</h1>
                                <div className="text-2xl border-b-2 w-24 text-end border-solid border-[#1f1e1e]">
                                    -{item?.paidAmount}
                                </div>
                            </div>

                            {/* Display Remaining Amount */}
                            <div className="flex w-full justify-between gap-8 mt-2">
                                <h1 className="text-2xl font-semibold">Remaining Amount</h1>
                                <div className="text-2xl">{item?.remainingAmount}</div>
                            </div>
                        </div>
                    ))
                    :
                    <NoDataFound />
                }

            </div>

            <PayCreditAmount id={id} />
        </div>
    );
};

export default CreditDetail;

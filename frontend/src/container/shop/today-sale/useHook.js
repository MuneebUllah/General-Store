import Swal from "sweetalert2";
import { Apis } from "../../../lib/apis";

const useShopBilling = () => {

    const getShopBill = async (setData , date) => {
        console.log(date);        
        await Apis.getShopBill(date ? date : new Date())
            .then((res) => setData(res?.data))
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err?.response?.data?.error,
                });

            })
    }


    return { getShopBill }
}

export default useShopBilling;
import Swal from "sweetalert2";
import { Apis } from "../../../../lib/apis"
import { dispatch } from "../../../../redux/store/store";
import { setNewBillModalIsOpen } from "../../../../redux/slices/userSlice";

const useShopBilling = () => {
    const createShopBill = async (body) => {
        await Apis.createShopBill(body)
            .then((res) =>{
                 console.log(res)
                 dispatch(setNewBillModalIsOpen(false));

        })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err?.response?.data?.error,
                });
            })
    }

    return { createShopBill }
}

export default useShopBilling;
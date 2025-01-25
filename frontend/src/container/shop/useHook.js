import Swal from "sweetalert2";
import { Apis } from "../../lib/apis";

const useShopBilling = () => {
    // const createShopBill = async () => {

    // }

    const getShopBill = async () => {
        await Apis.getShopBill()
            .then((res) => console.log(res))
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err?.response?.data?.error,
                });

            })
    }

    // const getShopBillById = async (id) => {
    //     await Apis.getShopBillById(id)
    //         .then((res) => console.log(res))
    //         .catch((err) => console.log(err))
    // }
    return { getShopBill }
}

export default useShopBilling;
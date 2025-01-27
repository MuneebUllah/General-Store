import Swal from "sweetalert2";
import { Apis } from "../../../../lib/apis";

const useBillDetail = () => {
    const getShopBillById = async (id , setData) => {
        await Apis.getShopBillById(id)
            .then((res) => setData(res?.data))
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err?.response?.data?.error,
                });
            })
}

return { getShopBillById }
}

export default useBillDetail;
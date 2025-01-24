import Swal from "sweetalert2";

const { Apis } = require("../../../lib/apis")

const useDetailPaidAmount = () => {
    const getPaidDetail = async (id , setData) => {
        await Apis.getPaidAmountDetail(id)
        .then((res) => setData(res?.data))
        .catch((err) => {
            console.log(err)           
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err?.response?.data?.error,
              });
        })
    }
    return{ getPaidDetail }
}

export default useDetailPaidAmount;
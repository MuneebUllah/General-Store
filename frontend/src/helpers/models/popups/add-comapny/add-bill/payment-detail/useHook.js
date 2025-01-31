import Swal from "sweetalert2"
import { dispatch } from "../../../../../../redux/store/store"
import { setPayCompaniesBillModalIsOpen } from "../../../../../../redux/slices/userSlice"
import { Apis } from "../../../../../../lib/apis"

const usePayAmount = () => {
  const payAmount = async (body, billId , companyId) => {
    await Apis.createPayment(body, billId , companyId)
      .then((res) => {
        console.log(res)        
        dispatch(setPayCompaniesBillModalIsOpen(false))
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err?.response?.data?.error,
        });
      })
  }
  return { payAmount }
}

export default usePayAmount; 
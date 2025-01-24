import Swal from "sweetalert2"
import { Apis } from "../../../../lib/apis"
import { dispatch } from "../../../../redux/store/store"
import { setPayCreditModalIsOpen } from "../../../../redux/slices/userSlice"

const usePayCreditAmount = () => {
  const payAmount = async (body, id) => {
    await Apis.payAmount(body, id)
      .then((res) => {
        dispatch(setPayCreditModalIsOpen(false))
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

export default usePayCreditAmount; 
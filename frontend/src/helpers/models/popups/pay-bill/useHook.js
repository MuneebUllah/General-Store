import Swal from "sweetalert2"
import { Apis } from "../../../../lib/apis"
import { dispatch } from "../../../../redux/store/store"
import { setPayBillModalIsOpen } from "../../../../redux/slices/userSlice"

const useHook = () => {
  const updateBill = async (body) => {
    console.log(body);
    await Apis.updateBill(body)
    .then((res) => {
      dispatch(setPayBillModalIsOpen(false))
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      console.log(res)})
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err?.response?.data?.error,
      });
    })
}
    return { updateBill }
}

export default useHook; 
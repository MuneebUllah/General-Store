import Swal from "sweetalert2"
import { Apis } from "../../../../lib/apis"
import { dispatch } from "../../../../redux/store/store"
import { setAddBillModalIsOpen, setRetailerModalIsOpen } from "../../../../redux/slices/userSlice"

const useHook = () => {
  const postBill = async (body) => {
    await Apis.createBill(body)
    .then((res) => {
      dispatch(setAddBillModalIsOpen(false))
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
    return { postBill }
}

export default useHook; 
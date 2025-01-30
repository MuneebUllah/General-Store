import Swal from "sweetalert2"
import { Apis } from "../../../../../lib/apis"
import { dispatch } from "../../../../../redux/store/store"
import { setAddBillModalIsOpen, setRetailerModalIsOpen } from "../../../../../redux/slices/userSlice"

const useHook = () => {
  const createNewBill = async (id ,body) => {
    await Apis.createNewBill(id ,body)
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

const getBillSuggestions = async (body , setSuggestions) => {
  await Apis.getBillSuggestions(body)
  .then((res) => setSuggestions(res?.data))
  .catch((err) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err?.response?.data?.error,
    });
  })
}
    return { createNewBill , getBillSuggestions}
}

export default useHook; 
import Swal from "sweetalert2"
import { Apis } from "../../../../lib/apis"
import { dispatch } from "../../../../redux/store/store"
import { setAddExpensesModalIsOpen } from "../../../../redux/slices/userSlice"

const useHook = () => {
  const postExpenses = async (body) => {
    await Apis.postExpenses(body)
    .then((res) => {
      dispatch(setAddExpensesModalIsOpen(false))
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      console.log(res)})
    .catch((err) =>{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err?.response?.data?.error,
      });
    })
}
    return { postExpenses }
}

export default useHook; 
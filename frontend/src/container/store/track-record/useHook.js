import Swal from "sweetalert2";
import { Apis } from "../../../lib/apis"

const useHook = () => {
    const getHistory = (setData) => {
        Apis.getHistory()
        .then((res) => setData(res.data.logs))
        .catch((err) =>{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err?.response?.data?.error,
              });
        })
    }

    const searchName = (category , setData) => {
        Apis.searchHistoryByName(category)
        .then((res) => setData(res?.data?.nameHistoryData))
        .catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err?.response?.data?.error,
              });
        })
    }

    return { getHistory , searchName}
}

export default useHook;
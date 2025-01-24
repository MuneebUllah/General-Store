import Swal from "sweetalert2";
import { Apis } from "../../../lib/apis"

const useHook = () => {
    const getDataByCategories = (category , setData) => {
        Apis.getDataByCategories(category)
        .then((res) =>setData(res.data))
        .catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err?.response?.data?.error,
              });
        })
    }

    const searchName = (category , setData) => {
        Apis.searchByName(category)
        .then((res) => setData(res?.data?.nameData))
        .catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err?.response?.data?.error,
              });
        })
    }

    return { getDataByCategories , searchName}
}

export default useHook;
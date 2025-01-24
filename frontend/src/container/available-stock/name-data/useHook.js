import Swal from "sweetalert2";
import { Apis } from "../../../lib/apis"

const useHook = () => {
    const getDataByName = (name , setData) => {
        Apis.getDataByName(name)
        .then((res) =>setData(res.data))
        .catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err?.response?.data?.error,
              });
        })
    }

    return { getDataByName }
}

export default useHook;
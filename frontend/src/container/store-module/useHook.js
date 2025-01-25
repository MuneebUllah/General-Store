import Swal from "sweetalert2";
import { Apis } from "../../lib/apis"

const useHook = () => {
    const getAllCategories = (setCategories) => {
        Apis.getAllCategories()
        .then((res) => setCategories(res.data.categories))
        .catch((err) =>{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err?.response?.data?.error,
              });
        })
    }

    const searchByCategory = (category , setData) => {
        Apis.searchByCategory(category)
        .then((res) => setData(res.data.categoryData))
        .catch((err) =>{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err?.response?.data?.error,
              });
        })        
    }

    return { getAllCategories , searchByCategory}
}

export default useHook;
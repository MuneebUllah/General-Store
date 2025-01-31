import Swal from "sweetalert2";
import { Apis } from "../../../../lib/apis";
import { dispatch } from "../../../../redux/store/store";
import { setAddStorkInStore } from "../../../../redux/slices/userSlice";

const useHook = () => {
  const postData = (body) => {
    Apis.postData(body)
      .then((res) => {
        if (res.status) {
          dispatch(setAddStorkInStore(false))
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err?.response?.data?.error,
        });
      })
  }

      const getStoreSuggestions = (type , query , setSuggestions) => {   
        console.log(query);
        Apis.getStoreSuggestions(type , query)
        .then((res) =>{
          setSuggestions(res?.data) 
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err?.response?.data?.error,
          });
        })
    }
  

  return { postData, getStoreSuggestions}
}

export default useHook; 
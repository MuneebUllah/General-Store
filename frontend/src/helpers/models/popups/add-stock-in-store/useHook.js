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

  // const getAllCategories = (setCategories) => {
  //   Apis.getAllCategories()
  //     .then((res) => setCategories(res.data.categories))
  //     .catch((err) => {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: err?.response?.data?.error,
  //       });
  //     })
  // }

  // const getAllNames = (setName) => {
  //   Apis.getAllNames()
  //     .then((res) => setName(res.data.names))
  //     .catch((err) => {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: err?.response?.data?.error,
  //       });
  //     })
  // }

  // const getAllSizes = (setSize) => {
  //   Apis.getAllSizes()
  //     .then((res) => setSize(res.data.sizes))
  //     .catch((err) => {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: err?.response?.data?.error,
  //       });
  //     })
  // }

  const getAllPrices = (setPrice) => {
    Apis.getAllPrices()
      .then((res) => setPrice(res.data.prices))
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
        //   if(type === 'name')  {       
        //   setSuggestions(res?.data?.names)
        // } else if(type === 'category'){
        //   setSuggestions(res?.data?.categories)
        // }  else if(type === 'size'){
        //   setSuggestions(res?.data?.sizes)
        // }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err?.response?.data?.error,
          });
        })
    }
  

  return { postData, getAllPrices, getStoreSuggestions}
}

export default useHook; 
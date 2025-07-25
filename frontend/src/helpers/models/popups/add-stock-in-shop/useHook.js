import Swal from "sweetalert2";
import { Apis } from "../../../../lib/apis";
import { dispatch } from "../../../../redux/store/store";
import { setAddStorkInShop } from "../../../../redux/slices/userSlice";

const useHook = () => {
  const postData = (body) => {
    console.log(body)    
    Apis.createNewStock(body)
      .then((res) => {
        if (res.status) {
          dispatch(setAddStorkInShop(false))
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
  //   Apis.getAllCategoriesForShop()
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

  // const getAllPrices = (setPrice) => {
  //   Apis.getAllPrices()
  //     .then((res) => setPrice(res.data.prices))
  //     .catch((err) => {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: err?.response?.data?.error,
  //       });
  //     })
  // }


  return { postData }
}

export default useHook; 
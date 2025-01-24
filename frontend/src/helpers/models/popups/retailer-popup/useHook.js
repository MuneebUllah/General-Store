import Swal from "sweetalert2"
import { Apis } from "../../../../lib/apis"
import { dispatch } from "../../../../redux/store/store"
import { setRetailerModalIsOpen } from "../../../../redux/slices/userSlice"

const useHook = () => {
    const dataById = (id , setData) => {
        Apis.getDataById(id)
        .then((res) => {setData(res?.data)})
        .catch((err) => console.log(err))
    }

    const addDataById = (id ,body) => {
        console.log('Add');
        
        Apis.addDataById(id , body)
        .then((res) => {
            dispatch(setRetailerModalIsOpen(false))
            Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, update it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        if(res.status){
                      Swal.fire({
                        title: "Updated!",
                        text: "Data Updated Successfully.",
                        icon: "success"
                      });
                    }
                    }
                  });
        })
        .catch((err) => console.log(err))
    }

    const removeDataById = (id ,body) => {
        Apis.removeDataById(id , body)
        .then((res) => {
            dispatch(setRetailerModalIsOpen(false))
            Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, update it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        if(res.status){
                      Swal.fire({
                        title: "Updated!",
                        text: "Data Updated Successfully.",
                        icon: "success"
                      });
                    }
                    }
                  });
        })
        .catch((err) => console.log(err))
    }
    return { dataById , addDataById , removeDataById }
}

export default useHook; 
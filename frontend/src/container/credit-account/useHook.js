import Swal from "sweetalert2";
const { Apis } = require("../../lib/apis")

const useCreditAccount = () => {
    const getCreditAccounts =async (setData) => {
        await Apis.getCreditAccounts()
        .then((res) => setData(res?.data))
        .catch((err) => {
            console.log(err)            
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err?.response?.data?.error,
              });
        })
    }

    const searchAccount =async (name , setData) => {
        await Apis.searchAccount(name)
        .then((res) => setData(res?.data))
        .catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err?.response?.data?.error,
              });
        })
    }

    return { getCreditAccounts , searchAccount }
}

export default useCreditAccount;
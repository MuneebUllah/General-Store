import Swal from "sweetalert2";

const { Apis } = require("../../lib/apis")

const useCompanies = () => {
    const getCompaniesName = async (setData) => {
        await Apis.getCompaniesName()
        .then((res) => setData(res?.data?.companies))
        .catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err?.response?.data?.error,
              });
        })
    }

    const searchBill =async ( name , setData) => {
        await Apis.searchBill('company' , name)
        .then((res) => setData(res?.data))
        .catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err?.response?.data?.error,
              });
        })
    }

    return { getCompaniesName , searchBill }
}

export default useCompanies;
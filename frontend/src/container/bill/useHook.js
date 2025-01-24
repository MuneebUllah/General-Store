import Swal from "sweetalert2";

const { Apis } = require("../../lib/apis")

const useBill = () => {
    const getBills =async (setData) => {
        await Apis.getBills()
        .then((res) => setData(res?.data))
        .catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err?.response?.data?.error,
              });
        })
    }

    const searchBill =async (name , setData) => {
        await Apis.searchBill(name)
        .then((res) => setData(res?.data))
        .catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err?.response?.data?.error,
              });
        })
    }

    return { getBills , searchBill }
}

export default useBill;
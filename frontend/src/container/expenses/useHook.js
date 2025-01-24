import Swal from "sweetalert2";

const { Apis } = require("../../lib/apis")

const useExpense = () => {
    const getExpenses =async (setData) => {
        await Apis.getExpenses()
        .then((res) => setData(res?.data))
        .catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err?.response?.data?.error,
              });
        })
    }
    const searchExpensesByDate =async (date ,setData) => {
        await Apis.searchExpenseByDate(date)
        .then((res) => setData(res?.data))
        .catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err?.response?.data?.error,
              });
        })
    }


    return { getExpenses  , searchExpensesByDate}
}

export default useExpense;
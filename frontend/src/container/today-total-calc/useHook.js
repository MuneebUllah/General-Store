import Swal from "sweetalert2";
import { Apis } from "../../lib/apis";

const useTodayTotalCalc = () => {
    const getUpdatedBills = async (setData) => {
        await Apis.getUpdatedBills()
            .then((res) => setData(res?.data))
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err?.response?.data?.error,
                });
            })

    }

    const totalSaving = async () => {
        Apis.getTotalSaving()
            .then((res) => console.log(res))
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err?.response?.data?.error,
                });
            }
            )
    }
    const searchTodayCalc = async (name, setData) => {
        Apis.searchTodayCalc(name)
            .then((res) => setData(res?.data))
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err?.response?.data?.error,
                });
            })
    }
    return { getUpdatedBills, searchTodayCalc , totalSaving }
}

export default useTodayTotalCalc;
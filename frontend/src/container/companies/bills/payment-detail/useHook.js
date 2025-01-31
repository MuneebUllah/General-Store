import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const { Apis } = require("../../../../lib/apis");

const useDetailPaidAmount = () => {
  const navigate = useNavigate();
  const getPaymentDetail = async (billId, companyId, setData) => {
    await Apis.getPaymentDetail(billId, companyId)
      .then((res) => setData(res?.data))
      .catch((err) => {
        if (err.response?.data?.message === "Bill not found") {
          navigate(-1);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err?.response?.data?.message,
          });
        }
      });
  };
  return { getPaymentDetail };
};

export default useDetailPaidAmount;

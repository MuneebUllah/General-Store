import { Apis } from "../../../../lib/apis"

const useShopBilling = () => {
    const createShopBill = async (body) => {
        await Apis.createBill(body)
        .then((res)=> console.log(res))
        .catch((err) => console.log(err))
    }

    return { createShopBill }
}

export default  useShopBilling;
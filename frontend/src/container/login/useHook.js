const { Apis } = require("../../lib/apis")

const useLogin =async () => {
    const login = async ( body) => {

        await Apis.login(body)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }
    return { login}
}

export default useLogin;

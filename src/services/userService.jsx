import Server from "./server";

const useUserService = () => {
    const getUser = async (data) => {
        let res = await fetch(`${Server}/api/Auth.GetUser`, {
            method: 'GET',
        }).then(response => response.json())
            .then(json => console.log(json));

        return res.result;
    }

    return {getUser}
}

export default useUserService;
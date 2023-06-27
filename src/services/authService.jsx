import Server from "./server";

const useAuthService = () => {
    const registration = async (data) => {
        let res = await fetch(`${Server}/api/Auth.Registration`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json());

        if(res.status === 'error') throw await res.errormessage;
        return res.result;
    }

    const logIn = async (data) => {
        let res = await fetch(`${Server}/api/Auth.Login`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json());

        if(res.status === 'error') throw await res.errormessage;
        return res.result;
    }

    const logOut = async () => {
        let res = await fetch(`${Server}/api/Auth.Logout`, {
            method: 'GET'
        }).then(response => response.json());

        if(res.status === 'error') throw await res.errormessage;
        return res.result;
    }

    return {registration, logIn, logOut}
}

export default useAuthService;
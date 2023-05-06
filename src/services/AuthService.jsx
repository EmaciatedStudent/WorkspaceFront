import Server from "./Server";

const useAuthService = () => {
    const logIn = async (data) => {
        let res = await fetch(`${Server}/api/Auth.Login`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(json => console.log(json));

        return res.result;
    }

    const logOut = async () => {
        let res = await fetch(`${Server}/api/Auth.Logout`, {
            method: 'GET'
        }).then(response => response.json())
            .then(json => console.log(json));

        return res.result;
    }

    return {logIn, logOut}
}

export default useAuthService;
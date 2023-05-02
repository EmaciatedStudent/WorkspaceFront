import Server from "./Server";

const useLoginService = () => {
    const login = async (data) => {
        const res = await fetch(`${Server}/api/Auth.Login`, {
            method: "POST",
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(json => console.log(json));
    };

    return login
}

export default useLoginService;
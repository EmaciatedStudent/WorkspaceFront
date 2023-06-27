import Server from "./server";

const useUserService = () => {
    const getUser = async () => {
        let res = await fetch(`${Server}/api/User.GetUser`, {
            method: "GET",
        }).then(response => response.json());

        if(res.status === 'error') throw await res.errormessage;

        return res.result;
    }

    const getUsersByCompany = async(data) => {
        let res = await fetch(`${Server}/api/User.GetUsersByCompany`, {
            method: "POST",
            body: JSON.stringify(data)
        }).then(response => response.json());

        if(res.status === 'error') throw await res.errormessage;

        return res.result;
    }

    const addExtraHours = async(data) => {
        let res = await fetch(`${Server}/api/User.AddExtraHours`, {
            method: "POST",
            body: JSON.stringify(data)
        }).then(response => response.json());

        if(res.status === 'error') throw await res.errormessage;

        return res.result;
    }

    const updateUserData = async(data) => {
        let res = await fetch(`${Server}/api/User.UpdateUserData`, {
            method: "POST",
            body: JSON.stringify(data)
        }).then(response => response.json());

        if(res.status === 'error') throw await res.errormessage;

        return res.result;
    }

    const updateUserPassword = async(data) => {
        let res = await fetch(`${Server}/api/User.UpdateUserPassword`, {
            method: "POST",
            body: JSON.stringify(data)
        }).then(response => response.json());

        if(res.status === 'error') throw await res.errormessage;

        return res.result;
    }



    return {getUser, updateUserData, updateUserPassword, getUsersByCompany, addExtraHours};
}

export default useUserService;
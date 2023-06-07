import Server from "./server";

const useCompanyService = () => {
    const getCompany = async(data) => {
        let res = await fetch(`${Server}/api/Company.GetCompany`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json());

        if(res.status === 'error') throw await res.error_message;
        return res.result;
    }

    const getCompanyDeal = async(data) => {
        let res = await fetch(`${Server}/api/Deal.GetCompanyDeal`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json());

        if(res.status === 'error') throw await res.error_message;
        return res.result;
    }

    return {getCompany, getCompanyDeal}
}

export default useCompanyService;
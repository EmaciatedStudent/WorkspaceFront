import Server from "./server";

const useDocumentsService = () => {
    const getActInfo = async (deal_id) => {
        const data = {
            deal_id
        }

        let res = await fetch(`${Server}/api/Act.GetActInfo`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json());

        if(res.status === 'error') throw await res.error_message;
        return res.result;
    }

    const getInvoiceInfo = async (act_id) => {
        const data = {
            act_id
        }

        let res = await fetch(`${Server}/api/Invoice.GetInvoiceInfo`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json());

        if(res.status === 'error') throw await res.error_message;
        return res.result;
    }

    return {getActInfo, getInvoiceInfo};
}

export default useDocumentsService;
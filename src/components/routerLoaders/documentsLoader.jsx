import useDocumentsService from "../../services/documentsService";
import useCompanyService from "../../services/companyService";

export async function DocumentsLoader() {
    const {getActInfo, getInvoiceInfo} = useDocumentsService();
    const {getCompanyDeal} = useCompanyService();

    let dealData = await getCompanyDeal().then(res => res.deal)
        .catch(res => console.log(res));

    let actData = await getActInfo(dealData.deal_id).then(res => res.act_info)
        .catch(res => console.log(res));

    let invoiceData = await getInvoiceInfo(actData.id).then(res => res.invoice_info)
        .catch(res => console.log(res));

    return {actData, invoiceData};
}
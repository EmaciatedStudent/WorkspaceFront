import useDocumentsService from "../../services/documentsService";
import useCompanyService from "../../services/companyService";

export async function DocumentsAdminLoader() {
    const {getActInfo, getInvoiceInfo} = useDocumentsService();
    const {getCompanyDeal, getCompanies} = useCompanyService();

    let companiesData = await getCompanies().then(res => res.companies_info)
        .catch(res => console.log(res));

    let dealData = await getCompanyDeal(75).then(res => res.deal)
        .catch(res => console.log(res));

    let actData = await getActInfo(dealData.deal_id).then(res => res.act_info)
        .catch(res => console.log(res));

    let invoiceData = await getInvoiceInfo(actData.id).then(res => res.invoice_info)
        .catch(res => console.log(res));

    return {companiesData, actData, invoiceData};
}
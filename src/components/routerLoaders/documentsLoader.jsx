import {useSelector} from "react-redux";
import {getCurrentUser} from "../../store/user/selectors";
import useDocumentsService from "../../services/documentsService";
import useCompanyService from "../../services/companyService";

export async function DocumentsLoader() {
    const user = useSelector(getCurrentUser);
    const {getActInfo, getInvoiceInfo} = useDocumentsService();
    const {getCompanyDeal} = useCompanyService();

    let dealData = await getCompanyDeal(user.company_id).then(res => res.deal)
        .catch(res => console.log(res));

    let actData = await getActInfo(dealData.deal_id).then(res => res.act_info)
        .catch(res => console.log(res));

    let invoiceData = await getInvoiceInfo(actData.id).then(res => res.invoice_info)
        .catch(res => console.log(res));

    return {actData, invoiceData};
}
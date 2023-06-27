import {useLoaderData} from "react-router-dom";
import {useState} from "react";
import useCompanyService from "../../services/companyService";
import useDocumentsService from "../../services/documentsService";

const DocumentsAdminPage = () => {
    const {companiesData, actData, invoiceData} = useLoaderData();

    const {getCompanyDeal} = useCompanyService();
    const {getActInfo, getInvoiceInfo} = useDocumentsService();

    const [companyId, setCompanyId] = useState('');


    const getInvoice = (act_id) => {
        return invoiceData.find(invoice => invoice['act'] === act_id);
    }
    const [documentsRows, setDocumentsRows] = useState(renderDocumentsRows(invoiceData, actData));

    function renderCompanies() {
        return companiesData.map(company => {
            return <option value={company['id']}>{company['name']}</option>
        })
    }

    const getCompanyDocuments = async() => {
        const data = {
            company_id: companyId
        }

        const dealData = await getCompanyDeal(data).then(res => res.deal);
        // console.log(dealData)
        // const actData = await getActInfo(dealData.contract_id).then(res => setActData(res.act_info));
        // console.log(actData)
        // const invoiceData = await getInvoiceInfo(actData.id).then(res => setInvoiceData(res.invoice_info));

        setDocumentsRows(renderDocumentsRows(invoiceData, actData));
    }

    function renderDocumentsRows(invoiceData, actData) {
        return actData.map(act => {
            const invoice = getInvoice(act['id']);
            // console.log(invoiceData)
            // console.log(act['id'])
            return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {invoice['name']}
                    </th>
                    <td className="px-6 py-4">
                        {invoice['date_insert']}
                    </td>
                    <td className="px-6 py-4">
                        {invoice['price'] + " руб."}
                    </td>
                    <td className="px-6 py-4">
                        {invoice['status']}
                    </td>
                    <td className="px-6 py-4 text-right">
                        <a href={invoice['link']}
                           className="font-medium text-violet-800 dark:text-violet-900 hover:underline">
                            Посмотреть счет
                        </a>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <a href={act['link']}
                           className="font-medium text-violet-800 dark:text-violet-900 hover:underline">
                            Посмотреть акт
                        </a>
                    </td>
                </tr>
            );
        });
    }

    return (<>
        <div className="m-5">
            <div className="relative">
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                    Счета и акты
                </h1>
            </div>
            <div className="mb-2 flex justify-between">
                <div className="w-fit grid grid-cols-3">
                    <div>
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Компания
                        </label>
                        <select id="countries"
                                onChange={(e) => setCompanyId(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-800 focus:border-violet-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-800 dark:focus:border-violet-800">
                            <option disabled selected>Выбрать компанию</option>
                            {renderCompanies()}
                        </select>
                    </div>
                    <div className="ml-4 mt-7">
                        <button id="defaultModalButton" data-modal-toggle="defaultModal"
                                onClick={() => getCompanyDocuments()}
                                className="block text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-900 dark:hover:bg-violet-800 dark:focus:ring-violet-800"
                                type="button">
                            ок
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Название
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Дата выставления
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Сумма
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Cтатус
                        </th>
                        <th>
                        </th>
                        <th>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderDocumentsRows(invoiceData, actData)}
                    </tbody>
                </table>
            </div>
        </div>
    </>);
}

export default DocumentsAdminPage;
import {useLoaderData} from "react-router-dom";

const DocumentsPage = () => {
    const {actData, invoiceData} = useLoaderData();

    const getInvoice = (act_id) => {
        return invoiceData.find(invoice => invoice['act'] === act_id);
    }

    return (
        <>
            <div className="m-5">
                <div className="relative">
                    <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                        Счета и акты
                    </h1>
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
                        {actData.map(act => {
                            const invoice = getInvoice(act['id']);

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
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default DocumentsPage;
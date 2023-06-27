import {useLoaderData} from "react-router-dom";
import {Dialog} from "primereact/dialog";
import {useState} from "react";
import useUserService from "../../services/userService";

const CompaniesPage = () => {
    const {companiesData} = useLoaderData();
    const {getUsersByCompany} = useUserService();

    const [companyVisible, setCompanyVisible] = useState(false);
    const [companyFormData, setCompanyFormData] = useState(null);

    const viewCompanyClick = async(value) => {
        const data = {
            company_id: value
        }

        const usersData = await getUsersByCompany(data).then(res => res.users_info);
        const company = companiesData.find(company => +company['id'] === +value);

        setCompanyFormData(<>
            <div className="px-20 pb-14 mt-4 space-y-4 lg:mt-5 md:space-y-5">
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                    {company['name']}
                </h1>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Адрес
                    </label>
                    <input type="text" name="login" id="login"
                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focuborder-violet-800 focus:border-violet-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-400 dark:focus:border-violet-400"
                           value={company['address']}
                           disabled/>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Электронная почта
                    </label>
                    <input type="text" name="last_name" id="last_name"
                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focuborder-violet-800 focus:border-violet-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-400 dark:focus:border-violet-400"
                           value={company['email']}
                           disabled/>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Телефон
                    </label>
                    <input type="text" name="name" id="name"
                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focuborder-violet-800 focus:border-violet-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-400 dark:focus:border-violet-400"
                           value={company['phone']}
                           disabled/>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Договор
                    </label>
                    <span>
                        {company['contract']+' с '+company['date_start']+' по '+company['date_end']}
                        <a href={company['link']} className="ml-6 font-medium text-violet-800 dark:text-violet-900 hover:underline">
                            Просмотр
                        </a>
                    </span>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Имя</th>
                        <th scope="col" className="px-6 py-3">Логин</th>
                        <th scope="col" className="px-6 py-3">Электронная почта</th>
                        <th scope="col" className="px-6 py-3">Лимит бронирования</th>
                        <th scope="col" className="px-6 py-3">Часов забронировано</th>
                    </tr>
                    </thead>
                    <tbody>
                        {renderUsersRows(usersData)}
                    </tbody>
                </table>
            </div>
        </>);
        setCompanyVisible(true);
    }

    function renderCompanyRows() {
        return companiesData.map(company => {
            return (<>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">{company['name']}</td>
                    <td className="px-6 py-4">{company['address']}</td>
                    <td className="px-6 py-4">{company['email']}</td>
                    <td className="px-6 py-4">{company['phone']}</td>
                    <td className="px-6 py-4 text-right">
                        <button value={company['id']}
                                onClick={(e) => viewCompanyClick(e.target.value)}
                                className="font-medium text-violet-800 dark:text-violet-900 hover:underline">
                            Просмотр
                        </button>
                    </td>
                </tr>
            </>);
        });
    }

    function renderUsersRows(usersData) {
        return usersData.map(user => {
            return (<>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">{user['name']+' '+user['last_name']}</td>
                    <td className="px-6 py-4">{user['login']}</td>
                    <td className="px-6 py-4">{user['email']}</td>
                    <td className="px-6 py-4">{+user['hours_count']+(+user['extra_hours'])}</td>
                    <td className="px-6 py-4">{user['booking_hours']}</td>
                </tr>
            </>);
        });
    }

    return (
        <>
            <div className="m-5">
                <div className="relative">
                    <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                        Компании
                    </h1>
                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Компания</th>
                            <th scope="col" className="px-6 py-3">Адрес</th>
                            <th scope="col" className="px-6 py-3">Электронная почта</th>
                            <th scope="col" className="px-6 py-3">Телефон</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {renderCompanyRows()}
                        </tbody>
                    </table>
                </div>
                <Dialog visible={companyVisible} style={{ width: '60vw' }} onHide={() => setCompanyVisible(false)}>
                    {companyFormData}
                </Dialog>
            </div>
        </>
    );
}

export default CompaniesPage;
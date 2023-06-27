import {useLoaderData} from "react-router-dom";
import {useState} from "react";
import useBookingService from "../../services/bookingService";

const BookingReportsPage = () => {
    const {companiesData} = useLoaderData();
    const {getCompanyBookingsByPeriod} = useBookingService();

    const [companyId, setCompanyId] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');

    const [companyBookings, setCompanyBookings] = useState([]);
    const [bookingRows, setBookingRows] = useState(renderBookings(companyBookings));

    const getCompanyBookings = async() => {
        const data = {
            company_id: companyId,
            date_start: dateStart,
            date_end: dateEnd
        }

        await getCompanyBookingsByPeriod(data).then(res => {
            setCompanyBookings(res.bookings_info);
            setBookingRows(renderBookings(companyBookings))
        });
    }

    const installReport = () => {

    }

    function renderCompanies() {
        return companiesData.map(company => {
            return <option value={company['id']}>{company['name']}</option>
        })
    }

    function renderBookings(companyBookings) {
        return companyBookings.map(booking => {
            return (<>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {booking['user_name']}
                    </th>
                    <td className="px-6 py-4">
                        {booking['name']}
                    </td>
                    <td className="px-6 py-4">
                        {booking['room']}
                    </td>
                    <td className="px-6 py-4">
                        {booking['date'] + ' ' + booking['time_start']}
                    </td>
                    <td className="px-6 py-4">
                        {booking['date'] + ' ' + booking['time_end']}
                    </td>
                </tr>
            </>);
        });
    }

    return (
        <>
            <div className="m-5">
                <div className="relative">
                    <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                        Формирование отчета
                    </h1>
                </div>
                <div className="mb-2 flex justify-between">
                    <div className="w-fit grid grid-cols-4">
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
                        <div className='pl-2'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Период
                            </label>
                            <div date-rangepicker className="flex items-center">
                                <span className="mx-4 text-gray-500">с</span>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <input name="start" type="date"
                                           onChange={(e) => setDateStart(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-800 focus:border-violet-800 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-800 dark:focus:border-violet-800"
                                           placeholder="Начало периода"/>
                                </div>

                                <span className="mx-4 text-gray-500">по</span>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <input name="end" type="date"
                                           onChange={(e) => setDateEnd(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-800 focus:border-violet-800 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-800 dark:focus:border-violet-800"
                                           placeholder="Окончание периода"/>
                                </div>
                            </div>
                        </div>
                        <div className="ml-4 mt-7 w-fit flex justify-between">
                            <button id="defaultModalButton" data-modal-toggle="defaultModal"
                                    onClick={() => getCompanyBookings()}
                                    className="h-[40px] block text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-900 dark:hover:bg-violet-800 dark:focus:ring-violet-800"
                                    type="button">
                                ок
                            </button>
                            <div className="ml-5 mt-2">
                                <label className="block mb-2 text-medium font-medium text-gray-900 dark:text-white">
                                    ИТОГ: {companyBookings.length * 0.5} ч.
                                </label>
                            </div>
                        </div>

                    </div>
                    <div className="m-5">
                        <button id="defaultModalButton" data-modal-toggle="defaultModal"
                                onClick={() => installReport()}
                                className="block text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-900 dark:hover:bg-violet-800 dark:focus:ring-violet-800"
                                type="button">
                            Скачать отчет
                        </button>
                    </div>
                </div>

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Пользователь
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Название
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Комната
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Начало бронирования
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Окончание бронирования
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {bookingRows}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default BookingReportsPage
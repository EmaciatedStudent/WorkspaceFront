import {Link, useLoaderData} from "react-router-dom";
import useBookingService from "../../services/bookingService";
import {useState} from "react";

const BookingHistoryPage = () => {
    const {bookingsData} = useLoaderData();
    const {deleteBooking} = useBookingService();

    const [bookingData, setBookingData] = useState([...bookingsData]);

    // const currentDate = new Date();
    const currentDate = new Date(2023, 5, 12, 13);

    const formatDate = (date, time) => {
        date = date.split('.');

        return new Date(date[1]+'.'+date[0]+'.'+date[2]+' '+time);
    }

    const deleteBookingClick = async(booking_id) => {
        const data = {
            booking_id
        }

        await deleteBooking(data).then(res => {
            setBookingData(bookingData => bookingData.filter(booking => +booking['id'] != +res.booking_id))
        });
    }

    return (
        <>
            <div className="fixed top-[54px] left-0 z-40 h-screen p-4 overflow-y-auto  bg-white w-80 dark:bg-gray-800">
                <div className="py-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link to={'/profile'}
                                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <span className="ml-3">Личный кабинет</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/bookingHistory'}
                                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <span className="flex-1 ml-3 whitespace-nowrap">История бронирований</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/documents'}
                                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <span className="flex-1 ml-3 whitespace-nowrap">Счета и акты</span>
                            </Link>
                        </li>
                        {/*<hr/>*/}
                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <span className="flex-1 ml-3 whitespace-nowrap">Выход</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="ml-[320px] m-5">
                <div className="relative">
                    <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                        История бронирований
                    </h1>
                </div>
                <div className="mb-2 flex justify-between">
                    <div className="w-fit grid grid-cols-4">
                        <div >
                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Договор
                            </label>
                            <select id="countries"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-800 focus:border-violet-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-800 dark:focus:border-violet-800">
                                <option disabled selected>Договор #13669 с 01.06.2023 по 30.06.2023</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Бронирование
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
                            <th>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {bookingData.map((booking, key) => (
                            <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                                {currentDate < formatDate(booking['date'], booking['time_start']) ?
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => deleteBookingClick(booking['id'])}
                                                className="font-medium text-violet-800 dark:text-violet-900 hover:underline">
                                            Отменить
                                        </button>
                                    </td>
                                    : null}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default BookingHistoryPage;
import {useSelector} from "react-redux";
import {getCurrentUser} from "../../store/user/selectors";
import {useLoaderData} from "react-router-dom";
import useBookingService from "../../services/bookingService";
import {useState} from "react";

const BookingHistoryPage = () => {
    const {bookingsData} = useLoaderData();
    const {deleteBooking} = useBookingService()

    const currentDate = new Date();

    const formatDate = (date, time) => {
        date = date.split('.');

        return new Date(date[1]+'.'+date[0]+'.'+date[2]+' '+time);
    }

    const deleteBookingClick = async(booking_id) => {
        const data = {
            booking_id
        }

        await deleteBooking(data);
    }

    return (
        <>
            <div className="m-5">
                <div className="relative">
                    <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                        История бронирований
                    </h1>
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
                        {bookingsData.map((booking, key) => (
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
import useBookingService from "../../services/bookingService";
import useCompanyService from "../../services/companyService";
import {useSelector} from "react-redux";
import {getCurrentUser} from "../../store/user/selectors";
import {useState} from "react";

const DaySchedule = ({currentDate, date, room_id, timeIntervals, bookingsData, bookingsSetState}) => {
    const user = useSelector(getCurrentUser);

    const {addBooking, deleteBooking} = useBookingService();
    const {getCompanyDeal} = useCompanyService();

    const [isExtraHours, setIsExtraHours] = useState(false);

    function getBookingByInteval(interval_start, interval_end) {
        return bookingsData.find(booking => booking['date'] === date
            && booking['time_start'] === interval_start
            && booking['time_end'] === interval_end
        )
    }

    const bookInterval = async(date, time_start, time_end) => {
        const dealInfo = await getCompanyDeal(user.company_id).then(res => res.deal);
        // const dealInfo = 4;

        if (+dealInfo['hours_count'] > +dealInfo['bookings_count']) {
            const data = {
                name: "Бронирование от " + currentDate,
                user_id: user.id,
                // user_id: 1,
                room_id,
                date,
                time_start,
                time_end
            }

            await addBooking(data).then(res => bookingsSetState([...bookingsData, res]));
        }
    }

    const deleteBookingClick = async(booking_id) => {
        const data = {
            booking_id
        }

        await deleteBooking(data).then(res => {});
    }

    const dayCells = getCells();

    function getCells() {
        return timeIntervals.map((interval, key) => {
            if(getBookingByInteval(interval['time_start'], interval['time_end'])) {
                return(
                    <td scope="row"
                        className="max-h-[70px] min-h-[70px] bg-white border-r border-b dark:bg-gray-800 dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="block align-top p-[23px] bg-violet-100 text-violet-800 hover:bg-violet-200 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <a href="#"
                               className="">
                                {getBookingByInteval(interval['time_start'], interval['time_end'])['company_name']}
                            </a>
                            {+user.id === +getBookingByInteval(interval['time_start'], interval['time_end'])['user'] ?
                                <button type="button"
                                        onClick={() => deleteBookingClick(getBookingByInteval(interval['time_start'], interval['time_end'])['id'])}
                                        className="pl-[10px] text-gray-400 hover:text-gray-900 text-sm ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    Отменить
                                </button>
                                : null}

                        </div>
                    </td>
                )
            } else {
                return(
                    <td scope="row"
                        className="max-h-[70px] min-h-[70px] px-6 py-4 bg-white border-r border-b dark:bg-gray-800 dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {currentDate > date ? null :
                            <>
                                <button type="button"
                                        onClick={() => bookInterval(date, interval['time_start'], interval['time_end'])}
                                        className="opacity-0 hover:opacity-100 w-full text-white bg-violet-800 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-300 dark:hover:bg-violet-300 dark:focus:ring-violet-800">
                                    Забронировать
                                </button>
                            </>}
                    </td>
                )
            }
        })
    }

    return(
        <>
            {dayCells}
            {isExtraHours ?
                <div id="popup-modal" tabIndex="-1"
                     className="fixed p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative mx-auto h-screen justify-center items-center w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button"
                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                    data-modal-hide="popup-modal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clip-rule="evenodd"></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-6 text-center">
                                <svg aria-hidden="true"
                                     className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none"
                                     stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure
                                    you want to delete this product?</h3>
                                <button data-modal-hide="popup-modal" type="button"
                                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No,
                                    cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            : null}

        </>
    );
}

export default DaySchedule;
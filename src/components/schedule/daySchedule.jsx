import useBookingService from "../../services/bookingService";
import useCompanyService from "../../services/companyService";
import {useSelector} from "react-redux";
import {getCurrentUser} from "../../store/user/selectors";
import {useState} from "react";

const DaySchedule = ({currentDate, date, room_id, timeIntervals, bookingsData}) => {
    const user = useSelector(getCurrentUser);
    const {addBooking} = useBookingService();
    const {getCompanyDeal} = useCompanyService();

    const [isExtraHours, setIsExtraHours] = useState(false);
    const [addExtraHours, setAddExtraHours] = useState(false);

    function getBookingByInteval(interval_start, interval_end) {
        return bookingsData.find(booking => booking['date'] === date
            && booking['time_start'] === interval_start
            && booking['time_end'] === interval_end
        )
    }

    const bookInterval = async(date, time_start, time_end) => {
        const dealInfo = getDealInfo(user.company_id);
        // const dealInfo = 4;

        if (Number(dealInfo['hours_count']) < Number(dealInfo['bookings_count']) || addExtraHours) {
            setAddExtraHours(false);

            const data = {
                name: "Бронирование от " + currentDate,
                user_id: user.id,
                // user_id: 1,
                room_id,
                date,
                time_start,
                time_end
            }

            await addBooking(data).then(res =>  window.location.reload());
        } else {
            setIsExtraHours(true);
            setAddExtraHours(true);
        }
    }

    const getDealInfo = async(company_id) => {
        await getCompanyDeal(company_id).then(res => res.deal);
    }

    const dayCells = getCells();

    function getCells() {
        return timeIntervals.map((interval, key) => {
            if(getBookingByInteval(interval['time_start'], interval['time_end'])) {
                return(
                    <td scope="row"
                        className="max-h-[70px] min-h-[70px] bg-white border-b dark:bg-gray-800 dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="block align-top p-[23px] bg-violet-100 text-violet-800 hover:bg-violet-200 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <a href="#"
                               className="">
                                {getBookingByInteval(interval['time_start'], interval['time_end'])['company_name']}
                            </a>
                            <button type="button"
                                    className="pl-[10px] text-gray-400 hover:text-gray-900 text-sm ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                Отменить
                            </button>
                        </div>
                    </td>
                )
            } else {
                return(
                    <td scope="row"
                        className="max-h-[70px] min-h-[70px] px-6 py-4 bg-white border-b dark:bg-gray-800 dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {currentDate > date ? null :
                            <>
                                <button type="button"
                                        onClick={() => bookInterval(date, interval['time_start'], interval['time_end'])}
                                        className="opacity-0 hover:opacity-100 text-white bg-violet-800 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-300 dark:hover:bg-violet-300 dark:focus:ring-violet-800">
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
        </>
    );
}

export default DaySchedule;
import useBookingService from "../../services/bookingService";
import useCompanyService from "../../services/companyService";
import useUserService from "../../services/userService";
import {useSelector} from "react-redux";
import {getCurrentUser} from "../../store/user/selectors";
import {useState} from "react";
import {Dialog} from "primereact/dialog";

const DaySchedule = ({currentDate, date, room_id, timeIntervals, bookingsData, bookingsSetState}) => {
    const user = useSelector(getCurrentUser);

    const {addBooking, deleteBooking} = useBookingService();
    const {addExtraHours} = useUserService();

    const [isExtraHoursVisible, setIsExtraHoursVisible] = useState(false);
    const [bookData, setBookData] = useState('');

    const currentDateFormat = new Date();
    // const currentDateFormat = new Date(2023, 5, 12, 13);

    const formatDate = (date, time) => {
        date = date.split('.');

        return new Date(date[1]+'.'+date[0]+'.'+date[2]+' '+time);
    }

    const addExtraHoursClick = async() => {
        const data = {
            user_id: user.id
        }

        await addExtraHours(data).then(res => bookInterval(bookData.date, bookData.time_start, bookData.time_end));
    }

    const bookInterval = async(date, time_start, time_end) => {
        const data = {
            name: "Бронирование от " + currentDate,
            user_id: user.id,
            // user_id: 1,
            room_id,
            date,
            time_start,
            time_end
        }

        await addBooking(data).then(res => {
            bookingsSetState(bookingsData => [...bookingsData, ...res.booking_info]);
        }).catch(res => {
            setIsExtraHoursVisible(true);
            setBookData(data);
        });
    }

    const deleteBookingClick = async(booking_id) => {
        const data = {
            booking_id
        }

        await deleteBooking(data).then(res => {
            bookingsSetState(bookingsData => bookingsData.filter(booking => +booking['id'] != +res.booking_id))
        });
    }

    const dayCells = getCells();

    function getBookingByInteval(interval_start, interval_end) {
        return bookingsData.find(booking => booking['date'] === date
            && booking['time_start'] === interval_start
            && booking['time_end'] === interval_end
        )
    }

    function getCells() {
        return timeIntervals.map((interval, key) => {
            const bookingInInterval = getBookingByInteval(interval['time_start'], interval['time_end']);

            if(bookingInInterval) {
                return(
                    <td scope="row"
                        className="max-h-[70px] min-h-[70px] bg-white border-r border-b dark:bg-gray-800 dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className={currentDateFormat < formatDate(bookingInInterval['date'], bookingInInterval['time_start']) ?
                            "block align-top p-[23px] bg-violet-100 text-violet-800 hover:bg-violet-200 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" :
                            "block align-top p-[23px] bg-gray-100 text-gray-400 border border-gray-100 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"}>
                            <span className="">
                                {bookingInInterval['company_name']}
                            </span>
                            {+user.id === +bookingInInterval['user'] &&
                            currentDateFormat < formatDate(bookingInInterval['date'], bookingInInterval['time_start']) ?
                                <button type="button"
                                        onClick={() => deleteBookingClick(bookingInInterval['id'])}
                                        className="pl-[10px] text-gray-400 hover:text-gray-900 text-sm ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    Отменить
                                </button>
                                : null}

                        </div>
                    </td>
                )
            } else {
                // opacity-0 hover:opacity-100
                // hidden group-hover:flex
                return(
                    <td scope="row"
                        className="group max-h-[70px] min-h-[70px] px-6 py-4 bg-white border-r border-b dark:bg-gray-800 dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {currentDateFormat > formatDate(date, interval['time_start']) ? null :
                            <>
                                <button type="button"
                                        onClick={() => bookInterval(date, interval['time_start'], interval['time_end'])}
                                        className="pl-3 w-full opacity-0 hover:opacity-100 text-white bg-violet-800 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-300 dark:hover:bg-violet-300 dark:focus:ring-violet-800">
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
            <Dialog visible={isExtraHoursVisible} style={{ width: '40vw' }} onHide={() => setIsExtraHoursVisible(false)}>
                <div className="pb-10 text-center">
                    <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                         fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Лимит бронирования исчерпан.<br/>
                        Желаете добавить часы за дополнительную плату?
                    </h3>
                    <div className="flex justify-center">
                        <div className="">
                            <label className="text-left block mb-2 text-sm font-medium text-gray-500 dark:text-white">
                                Количество часов
                            </label>
                            <input type="number" name="roominess" id="roominess"
                                   className="w-[300px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focuborder-violet-800 focus:border-violet-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-400 dark:focus:border-violet-400"
                                   required/>
                        </div>

                    </div>
                    <button data-modal-hide="popup-modal" type="button"
                            onClick={() => addExtraHoursClick()}
                            className="mt-[29px] max-h-[40px] min-h-[40px] text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-300 dark:focus:bg-violet-900 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                        Добавить часы
                    </button>
                    <button data-modal-hide="popup-modal" type="button"
                            onClick={() => setIsExtraHoursVisible(false)}
                            className="mt-4 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                        Отменить
                    </button>
                </div>
            </Dialog>
        </>
    );
}

export default DaySchedule;
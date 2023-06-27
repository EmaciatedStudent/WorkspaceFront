import left_arrow from "../../resourses/left-arrow.png";
import right_arrow from "../../resourses/right-arrow.png";
import {useLoaderData} from "react-router-dom";
import DaySchedule from "../schedule/daySchedule";
import {useState} from "react";
import {Dialog} from "primereact/dialog";
import DateService from "../schedule/date";
import useBookingService from "../../services/bookingService";

const SchedulePage = () => {
    const {intervalsData, bookingsData, roomData, currentDate, currentWeekDates, currentWeek} = useLoaderData();
    const {getBookingsByPeriod} = useBookingService();
    const {getWeekDates, getWeekDays, formatRuDate, getMonthDaysWithAdditionalDays} = DateService();

    const [bookingData, setBookingData] = useState([...bookingsData]);
    const [dateNow, setDateNow] = useState(currentDate);
    const [weekDates, setWeekDates] = useState([...currentWeekDates]);
    const [weekDays, setWeekDays] = useState([...currentWeek]);

    const [addExtraHours, setAddExtraHours] = useState(false);

    function renderDay(date) {
        console.log('render')
        console.log(bookingData)
        return <DaySchedule currentDate={dateNow}
                            date={date}
                            room_id={roomData.id}
                            timeIntervals={intervalsData}
                            bookingsData={bookingData}
                            bookingsSetState={setBookingData}/>
    }

    const formatDate = (date) => {
        date = date.split('.');

        return new Date(date[1]+'.'+date[0]+'.'+date[2]);
    }

    const previousWeekClick = async() => {
        const currentWeekDate = formatDate(weekDates[0]);
        const newDate = new Date(
            currentWeekDate.getFullYear(),
            currentWeekDate.getMonth(),
            currentWeekDate.getDate() - 1);

        setWeekDates([...getWeekDates(newDate)]);
        setWeekDays([...getWeekDays(newDate)]);

        let bookings = [];
        await getBookingsByPeriod(roomData.id, weekDates[0], weekDates[6])
            .then(res => bookings = res.bookings);
        setBookingData(bookings);
        console.log(bookingData);
    }

    const nextWeekClick = async() => {
        const currentWeekDate = formatDate(weekDates[6]);
        const newDate = new Date(
            currentWeekDate.getFullYear(),
            currentWeekDate.getMonth(),
            currentWeekDate.getDate() + 1);

        const dates = getWeekDates(newDate);
        setWeekDates([...dates]);

        const days = getWeekDays(newDate);
        setWeekDays([...days]);

        let bookings = [];
        await getBookingsByPeriod(roomData.id, weekDates[0], weekDates[6])
            .then(res => bookings = res.bookings);
        setBookingData(bookings);
        console.log(bookingData);
    }

    return (
        <>
            <div className="m-5">
                <div className="relative">
                    <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                        {roomData.name} (каб. {roomData.office})
                    </h1>
                </div>
                <div className="flex justify-between">
                    <div className="flex m-5">
                        <button className="text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-900 dark:hover:bg-violet-800 dark:focus:ring-violet-800"
                                onClick={() => previousWeekClick()}
                                type="button">
                            <img src={left_arrow}/>
                        </button>
                        <button className="ml-5  text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-900 dark:hover:bg-violet-800 dark:focus:ring-violet-800"
                                onClick={() => nextWeekClick()}
                                type="button">
                            <img src={right_arrow}/>
                        </button>
                    </div>
                    <div className="mt-7 mr-4 flex justify-between">
                        <label className="block mt-2 mb-2 text-medium font-medium text-violet-800 dark:text-white">
                            Количество часов для бронирования:
                            <span className="ml-6 font-medium text-violet-800 dark:text-violet-900">
                            3.5
                        </span>
                        </label>
                        <button className="max-h-[40px] min-h-[40px] ml-5  text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-900 dark:hover:bg-violet-800 dark:focus:ring-violet-800"
                                onClick={() => setAddExtraHours(true)}
                                type="button">
                            Добавить
                        </button>
                    </div>
                </div>
                <div className="relative w-[99.1%]">
                    <table className="w-full border-collapse text-sm text-left text-gray-500 dark:text-gray-400 ">
                        <tbody className="grid grid-cols-8 flex-row w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tr className="flex flex-col">
                            <th scope="row"
                                className="max-h-[50px] min-h-[50px] px-6 py-4 font-medium border-r text-gray-50 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            </th>
                        </tr>
                        {weekDates.map((date, key) =>
                            <tr className="flex flex-col" key={date}>
                                <th className="max-h-[50px] min-h-[50px] px-6 py-4 font-medium border-r text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    {weekDays[key]}
                                </th>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="relative overflow-y-scroll h-[650px]">
                    <table className="w-full border-collapse text-sm text-left text-gray-500 dark:text-gray-400 ">
                        <tbody className="grid grid-cols-8 flex-row w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tr className="flex flex-col">
                            {intervalsData.map((interval, key) =>(
                                <th scope="row"
                                    className="max-h-[70px] min-h-[70px] px-6 py-6 bg-white border-r border-b dark:bg-gray-800 dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    key={interval["id"]}>
                                    {interval["name"]}
                                </th>
                            ))}
                        </tr>
                        {weekDates.map((date, key) =>
                            <tr className="flex flex-col" key={date}>
                                {renderDay(date)}
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Dialog visible={addExtraHours} style={{ width: '40vw' }} onHide={() => setAddExtraHours(false)}>
                <div className="pb-10 text-center">
                    <h3 className="mb-5 text-lg font-medium text-gray-500 dark:text-gray-400">
                        Добавить часы за дополнительную плату?
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
                            className="mt-[29px] max-h-[40px] min-h-[40px] text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-300 dark:focus:bg-violet-900 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                        Добавить часы
                    </button>
                    <button data-modal-hide="popup-modal" type="button"
                            className="mt-4 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                        Отменить
                    </button>
                </div>
            </Dialog>
        </>
    );
}

export default SchedulePage;
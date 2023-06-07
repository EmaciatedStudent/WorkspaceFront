import left_arrow from "../../resourses/left-arrow.png";
import right_arrow from "../../resourses/right-arrow.png";
import {useLoaderData} from "react-router-dom";
import DaySchedule from "../schedule/daySchedule";
import {useState} from "react";

const SchedulePage = () => {
    const {intervalsData, bookingsData, roomData, currentDate, currentWeekDates, currentWeek, currenMonth} = useLoaderData();

    const [weekDate, setWeekDate] = useState();

    function renderDay(date) {
        return <DaySchedule currentDate={currentDate}
                            date={date}
                            room_id={roomData.id}
                            timeIntervals={intervalsData}
                            bookingsData={bookingsData}/>
    }

    const previousWeekClick = () => {

    }

    const nextWeekClick = () => {

    }

    return (
        <div className="m-5">
            <div className="relative">
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                    {roomData.name} (каб. {roomData.office})
                </h1>
            </div>
            <div className="flex justify-between">
                <div className="flex m-5">
                    <button className="text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-900 dark:hover:bg-violet-800 dark:focus:ring-violet-800"
                            onClick={previousWeekClick}
                            type="button">
                        <img src={left_arrow}/>
                    </button>
                    <button className="ml-5  text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-900 dark:hover:bg-violet-800 dark:focus:ring-violet-800"
                            onClick={nextWeekClick}
                            type="button">
                        <img src={right_arrow}/>
                    </button>
                </div>
            </div>

            <div className="relative h-screen">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <tbody className="grid grid-cols-8 flex-row w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tr className="flex flex-col">
                            <th scope="row"
                                className="max-h-[50px] min-h-[50px] px-6 py-4 font-medium text-gray-50 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            </th>
                            {intervalsData.map((interval, key) =>(
                                <th scope="row"
                                    className="max-h-[70px] min-h-[70px] px-6 py-6 bg-white border-b dark:bg-gray-800 dark:border-gray-700 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    key={interval["id"]}>
                                    {interval["name"]}
                                </th>
                            ))}
                        </tr>
                        {currentWeekDates.map((date, key) =>
                            <tr className="flex flex-col" key={date}>
                                <th className="max-h-[50px] min-h-[50px] px-6 py-4 font-medium text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    {currentWeek[key]}
                                </th>
                                {renderDay(date)}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SchedulePage;
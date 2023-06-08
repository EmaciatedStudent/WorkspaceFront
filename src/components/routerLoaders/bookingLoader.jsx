import useBookingService from "../../services/bookingService";
import useRoomService from "../../services/roomService";
import DateService from "../schedule/date";

export async function BookingLoader({params}) {
    const {getTimeIntervals, getBookingsByPeriod} = useBookingService();
    const {getRoom} = useRoomService();
    const {getWeekDates, getWeekDays, formatDate, getMonthDaysWithAdditionalDays} = DateService();

    let currentDate = new Date();
    const currentWeekDates = getWeekDates(currentDate);
    const currentWeek = getWeekDays(currentDate);
    const currenMonth = getMonthDaysWithAdditionalDays(currentDate);
    currentDate = formatDate(currentDate);

    const date_start = currentWeekDates[0];
    const date_end = currentWeekDates[6];
    const room_id = params.id;

    let intervalsData = await getTimeIntervals().then(res => res.time_intervals)
        .catch(res => console.log(res));

    let bookingsData = await getBookingsByPeriod(room_id, date_start, date_end).then(res => res.bookings)
        .catch(res => console.log(res));

    let roomData = await getRoom(room_id).then(res => res.room_info)
        .catch(res => console.log(res));

    return {intervalsData, bookingsData, roomData, currentDate,currentWeekDates, currentWeek, currenMonth};
}
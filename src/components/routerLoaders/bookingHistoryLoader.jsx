import useBookingService from "../../services/bookingService";

export async function BookingHistoryLoader() {
    const {getBookingsByUser} = useBookingService();

    let bookingsData = await getBookingsByUser().then(res => res.bookings)
        .catch(res => console.log(res));

    return {bookingsData};
}
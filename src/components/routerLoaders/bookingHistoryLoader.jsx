import useBookingService from "../../services/bookingService";
import {useSelector} from "react-redux";
import {getCurrentUser} from "../../store/user/selectors";

export async function BookingHistoryLoader() {
    const user = useSelector(getCurrentUser);
    const {getBookingsByUser} = useBookingService();

    let bookingsData = await getBookingsByUser(user.id).then(res => res.bookings)
        .catch(res => console.log(res));

    return {bookingsData};
}
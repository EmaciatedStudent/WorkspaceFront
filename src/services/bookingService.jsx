import Server from "./server";

const useBookingService = () => {
    const getTimeIntervals = async () => {
        let res = await fetch(`${Server}/api/Booking.GetTimeIntervals`, {
            method: 'GET',
        }).then(response => response.json());

        if(res.status === 'error') throw await res.error_message;
        return res.result;
    }

    const getBookingsByPeriod = async (room_id, date_start, date_end) => {
        const data = {
            room_id,
            date_start,
            date_end
        }

        let res = await fetch(`${Server}/api/Booking.GetBookingByPeriod`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json());

        if(res.status === 'error') throw await res.error_message;
        return res.result;
    }

    const addBooking = async (data) => {
        let res = await fetch(`${Server}/api/Booking.AddBooking`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json());

        if(res.status === 'error') throw await res.error_message;
        return res.result;
    }

    return {getTimeIntervals, getBookingsByPeriod, addBooking};
}

export default useBookingService;
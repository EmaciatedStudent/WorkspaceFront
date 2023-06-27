import Server from "./server";

const useBookingService = () => {
    const getTimeIntervals = async () => {
        let res = await fetch(`${Server}/api/Booking.GetTimeIntervals`, {
            method: 'GET',
        }).then(response => response.json());

        if(res.status === 'error') throw await res.errormessage;
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

        if(res.status === 'error') throw await res.errormessage;
        return res.result;
    }

    const getBookingsByUser = async (user_id) => {
        const data = {
            user_id
        }

        let res = await fetch(`${Server}/api/Booking.GetUserBookings`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json());

        if(res.status === 'error') throw await res.errormessage;
        return res.result;
    }

    const addBooking = async (data) => {
        let res = await fetch(`${Server}/api/Booking.AddBooking`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json());

        if(res.status === 'error') throw await res.errormessage;
        return res.result;
    }

    const deleteBooking = async(data) => {
        let res = await fetch(`${Server}/api/Booking.DeleteBooking`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json());

        if(res.status === 'error') throw await res.errormessage;
        return res.result;
    }

    const getCompanyBookingsByPeriod = async(data) => {
        let res = await fetch(`${Server}/api/Booking.GetCompanyBookingsByPeriod`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json());

        if(res.status === 'error') throw await res.errormessage;
        return res.result;
    }

    return {getTimeIntervals, getBookingsByPeriod, getBookingsByUser, getCompanyBookingsByPeriod, addBooking, deleteBooking};
}

export default useBookingService;
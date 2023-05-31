import Server from "./server";

const useRoomService = () => {
    const getRooms = async () => {
        let res = await fetch(`${Server}/api/Room.GetRoomsInfo`, {
            method: 'GET',
        }).then(response => response.json());

        if(res.status === 'error') throw await res.error_message;
        return res.result;
    }

    const getRoom = async (room_id) => {
        const data = {
            room_id
        }

        let res = await fetch(`${Server}/api/Room.GetRoom`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json());

        if(res.status === 'error') throw await res.error_message;
        return res.result;
    }

    return {getRooms, getRoom}
}

export default useRoomService;
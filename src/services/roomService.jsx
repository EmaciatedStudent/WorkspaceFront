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

    const addRoom = async (data) => {
        let res = await fetch(`${Server}/api/Room.AddRoom`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json());

        if(res.status === 'error') throw await res.error_message;
        return res.result;
    }

    const updateRoom = async (room_id, name, office, roominess) => {
        const data = {
            room_id,
            name,
            office,
            roominess
        }

        let res = await fetch(`${Server}/api/Room.UpdateRoom`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json());

        if(res.status === 'error') throw await res.error_message;
        return res.result;
    }

    const deleteRoom = async (data) => {
        let res = await fetch(`${Server}/api/Room.DeleteRoom`, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json());

        if(res.status === 'error') throw await res.error_message;
        return res.result;
    }

    return {getRooms, getRoom, addRoom, updateRoom, deleteRoom}
}

export default useRoomService;
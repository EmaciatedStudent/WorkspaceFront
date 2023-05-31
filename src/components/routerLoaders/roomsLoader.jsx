import useRoomService from "../../services/roomService";

export async function RoomsLoader() {
    const {getRooms} = useRoomService();

    let roomsData = await getRooms().then(res => res.rooms_info)
        .catch(res => console.log(res));

    return {roomsData};
}
import useRoomService from "../../services/roomService";

export async function RoomLoader({params}) {
    const room_id = params.id;

    const {getRoom} = useRoomService();

    let roomData = await getRoom(room_id)
        .catch(res => console.log(res));

    return {roomData};
}
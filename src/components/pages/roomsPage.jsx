import {useLoaderData} from "react-router-dom";
import RoomCard from "../rooms/roomCard";
import {useSelector} from "react-redux";
import {getCurrentUser} from "../../store/user/selectors";

const RoomsPage = () => {
    const user = useSelector(getCurrentUser);

    const {roomsData} = useLoaderData();
    const items = renderRooms();

    function renderRooms () {
        return roomsData.map(room => {
            return <RoomCard room={room}/>
        })
    }

    return (
        <div className="mt-8">
            {user.group.name === "Администратор" ?
                <div className=" flex float-right">
                    <button id="defaultModalButton" data-modal-toggle="defaultModal"
                            className="mr-4 block text-white bg-violet-800 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-900 dark:hover:bg-violet-800 dark:focus:ring-primary-800"
                            type="button">
                        Добавить
                    </button>
                </div>
                 : null}

            <table>
                <div className="w-screen">{items}</div>
            </table>
        </div>
    )
}


export default RoomsPage;
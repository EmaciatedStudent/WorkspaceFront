import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState} from "react";
import useRoomService from "../../services/roomService";
import {getCurrentUser} from "../../store/user/selectors";
import {Dialog} from 'primereact/dialog';

const RoomCard = ({room, roomData, setRoomData}) => {
    const {updateRoom, deleteRoom} = useRoomService();

    const user = useSelector(getCurrentUser);

    const id = room['id'];
    const [name, setName] = useState(room.name);
    const [office, setOffice] = useState(room.office);
    const [roominess, setRoominess] = useState(room.roominess);

    const [updatedName, setUpdatedName] = useState(name);
    const [updatedOffice, setUpdatedOffice] = useState(office);
    const [updatedRoominess, setUpdatedRoominess] = useState(roominess);

    const [updateRoomVisible, setUpdateRoomVisible] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");

    const updateRoomClick = async(e) => {
        e.preventDefault();

        await updateRoom(id, updatedName, updatedOffice, updatedRoominess)
            .then(res => {
                setName(updatedName);
                setOffice(updatedOffice);
                setRoominess(updatedRoominess);

                setRoomData(roomData => [...roomData.filter(room => +room['id'] != +id), res.room_info]);
            })
            .then(res => {
                setIsError(false)
            })
            .then(res => {
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 2000);
            })
            .then(res => setUpdateRoomVisible(false))
            .catch(e=>console.log(e));
    }

    const deleteRoomClick = async() => {
        const data = {
            room_id: id
        }

        await deleteRoom(data)
            .then(res => {
                setRoomData(roomData => roomData.filter(room => +room['id'] != +id));
                setUpdateRoomVisible(false);
            });
    }

    const cancelUpdateRoom = () => {
        setUpdatedName(name);
        setUpdatedOffice(office);
        setUpdatedRoominess(roominess);

        setUpdateRoomVisible(false);
    }

    return (
        <div
            className="m-4 flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow">
            <Link to={id}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{name} ({office} каб.)</h5>
            </Link>
            <div className="self-end">
                {user.group.name === "Администратор" ?
                    <button label="Show" icon="pi pi-external-link"
                            onClick={() => setUpdateRoomVisible(true)}
                            className="inline-flex mr-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-800 rounded-lg hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-500">
                        Редактировать
                    </button>
                     : null}


                <Link to={id}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-800 rounded-lg hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-500 ">
                    Расписание
                    <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"></path>
                    </svg>
                </Link>
            </div>

            <Dialog visible={updateRoomVisible} style={{ width: '40vw' }} onHide={() => cancelUpdateRoom()}>
                <div className="px-20 pb-14">
                    <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                        Изменить комнату
                    </h1>
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={updateRoomClick}>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Название
                            </label>
                            <input type="text" name="name" id="name"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focuborder-violet-800 focus:border-violet-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-400 dark:focus:border-violet-400"
                                   value={updatedName}
                                   onChange={(e) => setUpdatedName(e.target.value)}
                                   required/>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Кабинет
                            </label>
                            <input type="number" name="office" id="office"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focuborder-violet-800 focus:border-violet-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-400 dark:focus:border-violet-400"
                                   value={updatedOffice}
                                   onChange={(e) => setUpdatedOffice(e.target.value)}
                                   required/>
                        </div>
                        <button type="submit"
                                className="w-full text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-800 dark:hover:bg-violet-900 dark:focus:ring-primary-800">
                            Изменить
                        </button>
                        <button type="button"
                                onClick={() => deleteRoomClick()}
                                className="w-full text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-800 dark:hover:bg-violet-900 dark:focus:ring-primary-800">
                            Удалить
                        </button>
                    </form>
                    <div
                        className={isError ? "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" : "hidden"}
                        role="alert">
                        <span className="font-medium">ОШИБКА</span> {error}
                    </div>
                    <div
                        className={isSuccess ? "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" : "hidden"}
                        role="alert">
                        <span className="font-medium">Данные изменены</span>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default RoomCard;

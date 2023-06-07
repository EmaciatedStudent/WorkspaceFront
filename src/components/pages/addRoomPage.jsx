import useRoomService from "../../services/roomService";
import {setCurrentUser} from "../../store/user/slice";
import {useState} from "react";

const AddRoomPage = () => {
    const [name, setName] = useState("");
    const [office, setOffice] = useState("");
    const [roominess, setRoominess] = useState("");

    const {addRoom} = useRoomService();

    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");

    const addRoomClick = async(e) => {
        e.preventDefault();

        const data = {
            name,
            office,
            roominess
        }

        await addRoom(data)
            .then(res => setIsError(false))
            .then(res => {
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 2000)
            })
            .then(res => window.location.replace('rooms'))
            .catch(res => {
                setError(res.replace("<br>", ""));
                setIsError(true);
            });
    }

    const cancelClick = () => {
        window.location.replace('rooms')
    }

    return (
        <>
            <div
                className="mx-auto h-screen justify-center items-center p-6 bg-white rounded-lg md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                    Добавить комнату
                </h1>
                <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                      onSubmit={addRoomClick}>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Название
                        </label>
                        <input type="text" name="name" id="name"
                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focuborder-violet-800 focus:border-violet-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-400 dark:focus:border-violet-400"
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                               required/>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Кабинет
                        </label>
                        <input type="number" name="office" id="office"
                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focuborder-violet-800 focus:border-violet-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-400 dark:focus:border-violet-400"
                               value={office}
                               onChange={(e) => setOffice(e.target.value)}
                               required/>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Количество мест
                        </label>
                        <input type="number" name="roominess" id="roominess"
                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focuborder-violet-800 focus:border-violet-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-400 dark:focus:border-violet-400"
                               value={roominess}
                               onChange={(e) => setRoominess(e.target.value)}
                               required/>
                    </div>
                    <button type="submit"
                            className="w-full text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-800 dark:hover:bg-violet-900 dark:focus:ring-primary-800"
                    >
                        Добавить
                    </button>
                    <button type="button"
                            onClick={cancelClick}
                            className="w-full text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-800 dark:hover:bg-violet-900 dark:focus:ring-primary-800"
                    >
                        Отменить
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
                    <span className="font-medium">Комната добавлена</span>
                </div>
            </div>
        </>
    );
}

export default AddRoomPage;
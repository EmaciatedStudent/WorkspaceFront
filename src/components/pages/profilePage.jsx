import {setCurrentUser} from "../../store/user/slice";
import {getCurrentUser} from "../../store/user/selectors";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import useUserService from "../../services/userService";

const ProfilePage = () => {
    const user = useSelector(getCurrentUser);
    const dispatch = useDispatch();

    const [name, setName] = useState(user.name);
    const [last_name, setLastName] = useState(user.last_name);
    const [login, setLogin] = useState(user.login);
    const [email, setEmail] = useState(user.email);

    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");

    const [updateData, setUpdateData] = useState(false);
    const [updatePassword, setUpdatePassword] = useState(false);
    const {updateUserData, updateUserPassword} = useUserService();

    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");

    const updateDataClick = async(e) => {
        e.preventDefault();

        const data = {
            user_id: user.id,
            name,
            last_name,
            login,
            email
        }

        await updateUserData(data)
            .then(res => dispatch(setCurrentUser(res.user ? res.user : null)))
            .then(res => setIsError(false))
            .then(res => {
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 2000)
            })
            .then(res => setUpdateData(false))
            .catch(res => {
                setError(res.replace("<br>", ""));
                setIsError(true);
            });
    }

    const updatePasswordClick = async(e) => {
        e.preventDefault();

        const data = {
            user_id: user.id,
            password,
            confirm_password
        }

        await updateUserPassword(data)
            .then(res => dispatch(setCurrentUser(res.user ? res.user : null)))
            .then(res => setIsError(false))
            .then(res => {
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 2000)
            })
            .then(res => setUpdatePassword(false))
            .catch(res => {
                setError(res.replace("<br>", ""));
                setIsError(true);
            });
    }

    const cancelClick = () => {
        setUpdateData(false);
        setUpdatePassword(false);
    }

    return(
        <>
            <div className="mx-auto h-screen justify-center items-center p-6 bg-white rounded-lg md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                    {updateData||updatePassword ? null : "Личный кабинет"}
                    {updateData ? "Изменение данных" : null}
                    {updatePassword ? "Изменение пароля" : null}
                </h1>
                <form className={updatePassword ? "hidden" : "mt-4 space-y-4 lg:mt-5 md:space-y-5"}
                      onSubmit={updateDataClick}>
                    { updateData ?
                        <>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Логин
                                </label>
                                <input type="text" name="login" id="login"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focuborder-violet-800 focus:border-violet-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-400 dark:focus:border-violet-400"
                                       value={login}
                                       onChange={(e) => setLogin(e.target.value)}
                                       required/>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Фамилия
                                </label>
                                <input type="text" name="last_name" id="last_name"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focuborder-violet-800 focus:border-violet-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-400 dark:focus:border-violet-400"
                                       value={last_name}
                                       onChange={(e) => setLastName(e.target.value)}
                                       required/>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Имя
                                </label>
                                <input type="text" name="name" id="name"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focuborder-violet-800 focus:border-violet-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-400 dark:focus:border-violet-400"
                                       value={name}
                                       onChange={(e) => setName(e.target.value)}
                                       required/>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Электронная почта
                                </label>
                                <input type="email" name="email" id="email"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focuborder-violet-800 focus:border-violet-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-400 dark:focus:border-violet-400"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       required/>
                            </div>
                            <button type="submit"
                                    className="w-full text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-800 dark:hover:bg-violet-900 dark:focus:ring-primary-800">
                                Изменить данные
                            </button>
                            <button type="button"
                                    onClick={cancelClick}
                                    className="w-full text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-800 dark:hover:bg-violet-900 dark:focus:ring-primary-800">
                                Отменить
                            </button>
                        </>
                        :
                        <>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Логин
                                </label>
                                <input type="text" name="login" id="login"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focuborder-violet-800 focus:border-violet-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-400 dark:focus:border-violet-400"
                                       value={login}
                                       disabled/>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Фамилия
                                </label>
                                <input type="text" name="last_name" id="last_name"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focuborder-violet-800 focus:border-violet-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-400 dark:focus:border-violet-400"
                                       value={last_name}
                                       disabled/>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Имя
                                </label>
                                <input type="text" name="name" id="name"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focuborder-violet-800 focus:border-violet-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-400 dark:focus:border-violet-400"
                                       value={name}
                                       disabled/>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Электронная почта
                                </label>
                                <input type="email" name="email" id="email"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focuborder-violet-800 focus:border-violet-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-400 dark:focus:border-violet-400"
                                       value={email}
                                       disabled/>
                            </div>
                        </>
                    }
                </form>
                <form className={updatePassword? "mt-4 space-y-4 lg:mt-5 md:space-y-5" : "hidden"}
                      onSubmit={updatePasswordClick}>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Пароль
                        </label>
                        <input type="password" name="password" id="password"
                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focuborder-violet-800 focus:border-violet-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-400 dark:focus:border-violet-400"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               required/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Подтверждение пароля
                        </label>
                        <input type="password" name="last_name" id="last_name"
                               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focuborder-violet-800 focus:border-violet-800 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-400 dark:focus:border-violet-400"
                               value={confirm_password}
                               onChange={(e) => setConfirmPassword(e.target.value)}
                               required/>
                    </div>
                    <button type="submit"
                            className="w-full text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-800 dark:hover:bg-violet-900 dark:focus:ring-primary-800">
                        Изменить пароль
                    </button>
                    <button type="button"
                            onClick={cancelClick}
                            className="w-full text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-800 dark:hover:bg-violet-900 dark:focus:ring-primary-800">
                        Отменить
                    </button>
                </form>
                {updateData || updatePassword ? null :
                    <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                        <button type="click"
                                onClick={() => setUpdateData(true)}
                                className="w-full text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-800 dark:hover:bg-violet-900 dark:focus:ring-primary-800">
                            Изменить персональные данные
                        </button>
                        <button type="click"
                                onClick={() => setUpdatePassword(true)}
                                className="w-full text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-800 dark:hover:bg-violet-900 dark:focus:ring-primary-800">
                            Изменить пароль
                        </button>
                    </div>
                }
                <div
                    className={isError ? "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" : "hidden"}
                    role="alert">
                    <span className="font-medium">ОШИБКА</span> {error}
                </div>
                <div
                    className={isSuccess ? "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" : "hidden"}
                    role="alert">
                    <span className="font-medium">Данные успешно изменены</span>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;
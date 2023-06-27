import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";

import InputAuth from "../inputs/InputAuth";
import {setCurrentUser} from "../../store/user/slice";
import useAuthService from "../../services/authService";
import {Dialog} from "primereact/dialog";

const LoginPage = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const {logIn} = useAuthService();

    const [isError, setIsError] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || "/";

    const logInClick = async (e) => {
        e.preventDefault();

        const data = {
            login,
            password
        }

        await logIn(data)
            .then(res => dispatch(setCurrentUser(res.user ? res.user : null)))
            .then(() => navigate(fromPage, {replace: true}))
            .catch(res => {
                setError(res.replace(/<br>/g, ''));
                setIsError(true);
            });
    }

    return (
        <>
            <div className="mx-auto justify-center items-center p-6 bg-white md:mt-0 sm:max-w-md sm:p-8">
                <div className="p-4 bg-white  sm:p-5">
                    <div
                        className="flex justify-between items-center pb-4 mb-4 rounded-t sm:mb-5 dark:border-gray-600">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Авторизация
                        </h1>
                    </div>

                    <form className="flex flex-col"
                          onSubmit={logInClick}>
                        <div className="flex flex-col gap-4 mb-4 sm:grid-cols-2">
                            <InputAuth
                                inputLabel={'Логин'} inputName={'login'} inputType={'text'}
                                value={login}
                                onChange={e => setLogin(e.target.value)}/>
                            <InputAuth
                                inputLabel={'Пароль'} inputName={'password'} inputType={'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button type="submit"
                                    className="text-white bg-violet-800 hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-800 dark:hover:bg-violet-900 dark:focus:ring-violet-900">
                                Войти
                            </button>
                        </div>
                    </form>

                    <div
                        className={isError ? "p-4 mt-8 text-sm text-red-800 rounded-lg bg-red-50" : "hidden"}
                        role="alert">
                        <span className="font-medium">ОШИБКА: </span>
                        {error}
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
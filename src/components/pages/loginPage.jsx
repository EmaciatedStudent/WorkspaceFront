import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";

import InputAuth from "../inputs/InputAuth";
import {setCurrentUser} from "../../store/user/slice";
import useAuthService from "../../services/authService";

const LoginPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/';

    const dispatch = useDispatch();

    const {logIn} = useAuthService();

    const logInClick = async (e) => {
        e.preventDefault();

        const data = {
            login,
            password
        }

        await logIn(data)
            .then(res => dispatch(setCurrentUser(res.user?res.user:null))).then(()=>navigate(fromPage, {replace: true}))
            .catch(res => console.log(res));
    }

    return (
        <>
            <div className="flex w-full h-screen justify-center items-center">
                <div className="w-[500px] p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div
                        className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Авторизация
                        </h3>
                    </div>

                    <form className='flex flex-col' action="#" onSubmit={logInClick}>
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
                                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Войти
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    );
}

export default LoginPage;
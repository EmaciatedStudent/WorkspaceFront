import {useDispatch} from "react-redux";
import {useState} from "react";

import InputAuth from "../inputs/InputAuth";
import {setCurrentUser} from "../../store/user/slice";
import useAuthService from "../../services/authService";

const RegistrationPage = () => {
    const [login, setLogin] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const group = "4";

    const dispatch = useDispatch();

    const {registration} = useAuthService();

    const registrationClick = async (e) => {
        e.preventDefault();

        const data = {
            login,
            name,
            lastname,
            email,
            password,
            confirm_password,
            group
        }

        console.log(data)

        await registration(data)
            .then(res => dispatch(setCurrentUser(res.user)))
            .catch(res => console.log(res));
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Регистрация
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={registrationClick}>
                            <InputAuth inputLabel={'Логин'} inputName={'login'} inputType={'логин'}
                                       value={login}
                                       onChange={e => setLogin(e.target.value)}/>
                            <InputAuth inputLabel={'Имя'} inputName={'name'} inputType={'text'}
                                       value={name}
                                       onChange={e => setName(e.target.value)}/>
                            <InputAuth inputLabel={'Фамилия'} inputName={'lastname'} inputType={'text'}
                                       value={lastname}
                                       onChange={e => setLastname(e.target.value)}/>
                            <InputAuth inputLabel={'Эл. почта'} inputName={'email'} inputType={'text'}
                                       value={email}
                                       onChange={e => setEmail(e.target.value)}/>
                            <InputAuth inputLabel={'Пароль'} inputName={'password'} inputType={'password'}
                                       value={password}
                                       onChange={e => setPassword(e.target.value)}/>
                            <InputAuth inputLabel={'Подтверждение пароля'} inputName={'confirmPassword'} inputType={'password'}
                                       value={confirm_password}
                                       onChange={e => setConfirmPassword(e.target.value)}/>
                            <button type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Зарегистрироваться
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RegistrationPage;
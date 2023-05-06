import '../../style/style.scss';
import Test from '../test_reg/test';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser} from "../../store/user/slice";
import {getCurrentUser} from "../../store/user/selectors";
import {Tab} from '@headlessui/react';
import {createBrowserRouter, Link, RouterProvider,} from "react-router-dom";
import UserPage from "../pages/userPage";
import TestPage from "../pages/test";
import LoginPage from "../pages/loginPage";


function App() {
    const dispatch = useDispatch();
    const user = useSelector(getCurrentUser);

    const register = async () => {
        let data = {
            "login": "testik29",
            "name": "testik",
            "lastname": "testik",
            "password": "testik",
            "confirm_password": "testik1",
            "email": "testik@mail.ru",
            "group": "4"
        };

        let res = await fetch('http://workspace.devaid.ru/api/Auth.Registration', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(json => console.log(json));
    }

    const login = async () => {
        let data = {
            "login": "testik8",
            "password": "testik",
            "remember": "Y"
        };

        let res = await fetch('http://workspace.devaid.ru/api/Auth.Login', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json());

        dispatch(setCurrentUser(res.result.user));
        console.log(user);
        console.log(res);
    }

    const loginByHash = async () => {
        dispatch(setCurrentUser({"name": "sss"}));
        console.log(user);
    }

    const auth = async () => {
        let data = {
            "user_id": '1'
        };

        let res = await fetch('http://workspace.devaid.ru/api/Auth.Authorize', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(json => console.log(json))
    }

    const info = async () => {
        let res = await fetch('http://workspace.devaid.ru/api/Auth.GetUserInfo', {
            method: 'POST'
        }).then(response => response.json())
            .then(json => console.log(json))
    }

    // вот тут
    const router = createBrowserRouter([
        {
            path: "/",
            element:
                <div>
                    <Link to={'login'}>Авторизация</Link>
                    <Link to={'userPage'}>Личный кабинет</Link>
                    <Link to={'test'}>TestPage</Link>
                </div>,
        },
        {
            path: "login",
            element: <LoginPage/>,
        },
        {
            path: "userPage",
            element: <UserPage/>,
        },
        {
            path: "test",
            element: <TestPage/>,
        },
    ]);

    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}

export default App;
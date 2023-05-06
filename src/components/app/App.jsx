import '../../style/style.scss';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser} from "../../store/user/slice";
import {getCurrentUser} from "../../store/user/selectors";
import {Tab} from '@headlessui/react';
import {createBrowserRouter, Link, RouterProvider,} from "react-router-dom";
import UserPage from "../pages/userPage";
import TestPage from "../pages/test";
import RootApp from "../rootApp/rootApp";
import LoginPage from "../pages/loginPage";

function App() {
    const dispatch = useDispatch();
    const user = useSelector(getCurrentUser);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootApp/>,
            children: [
                {
                    path: "login",
                    element: <LoginPage/>,
                },
                {
                    path: "test",
                    element: <TestPage/>,
                }
            ]
        }
    ]);

    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}

export default App;
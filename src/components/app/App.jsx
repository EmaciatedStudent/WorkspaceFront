import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {getCurrentUser} from "../../store/user/selectors";
import LoginApp from "../appContainers/loginApp";
import LoginPage from "../pages/loginPage";
import RegistrationPage from "../pages/registrationPage";
import RootApp from "../appContainers/rootApp";

import useUserService from "../../services/userService";
import {useEffect} from "react";
import {setCurrentUser} from "../../store/user/slice";
import ProfilePage from "../pages/profilePage";
import {RootLoader} from "../routerLoaders/rootLoader";
import RoomsPage from "../pages/roomsPage";
import {RoomsLoader} from "../routerLoaders/roomsLoader";


function App() {
    const {getUser}  = useUserService();

    const dispatch = useDispatch();

    useEffect( () => {
        console.log('main')
        getUser().then(res => dispatch(setCurrentUser(res.user?res.user:null)))
            .catch(res => console.log(res));
    }, [])

    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootApp/>,
            children: [
                {
                    path: "rooms",
                    element: <RoomsPage/>,
                    loader: RoomsLoader
                },
                {
                    path: "profile",
                    element: <ProfilePage/>,
                }
            ],
            loader: RootLoader
        },
        {
            path: "login",
            element: <LoginApp/>,
            children: [
                {
                    path: "",
                    element: <LoginPage/>
                }
            ]
        },
        {
            path: "registration",
            element: <LoginApp/>,
            children: [
                {
                    path: "",
                    element: <RegistrationPage/>
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
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
import SchedulePage from "../pages/schedulePage";
import {BookingLoader} from "../routerLoaders/bookingLoader";
import AddRoomPage from "../pages/addRoomPage";
import BookingHistoryPage from "../pages/bookingHistoryPage";
import {BookingHistoryLoader} from "../routerLoaders/bookingHistoryLoader";
import DocumentsPage from "../pages/documentsPage";
import {DocumentsLoader} from "../routerLoaders/documentsLoader";
import BookingReportsPage from "../pages/bookingReportsPage";
import {BookingReportsLoader} from "../routerLoaders/bookingReportsLoader";
import CompaniesPage from "../pages/companiesPage";
import {CompaniesLoader} from "../routerLoaders/companiesLoader";
import DocumentsAdminPage from "../pages/documentsAdminPage";
import {DocumentsAdminLoader} from "../routerLoaders/documentsAdminLoader";

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
                    path: "rooms/:id",
                    element: <SchedulePage/>,
                    loader: BookingLoader
                },
                {
                    path: "rooms/addRoom",
                    element: <AddRoomPage/>
                },
                {
                    path: "rooms",
                    element: <RoomsPage/>,
                    loader: RoomsLoader
                },
                {
                    path: "profile",
                    element: <ProfilePage/>,
                },
                {
                    path: "bookingHistory",
                    element: <BookingHistoryPage/>,
                    loader: BookingHistoryLoader
                },
                {
                    path: "documents",
                    element: <DocumentsPage/>,
                    loader: DocumentsLoader
                },
                {
                    path: "bookingReports",
                    element: <BookingReportsPage/>,
                    loader: BookingReportsLoader
                },
                {
                    path: "companies",
                    element: <CompaniesPage/>,
                    loader: CompaniesLoader
                },
                {
                    path: "documentsAdmin",
                    element: <DocumentsAdminPage/>,
                    loader: DocumentsAdminLoader
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
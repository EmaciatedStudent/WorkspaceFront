import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {getCurrentUser} from "../../store/user/selectors";
import LoginApp from "../appContainers/loginApp";
import LoginPage from "../pages/loginPage";
import RegistrationPage from "../pages/registrationPage";
import RootApp from "../appContainers/rootApp";
import TestPage from "../pages/test";

function App() {
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
                    path: "registration",
                    element: <RegistrationPage/>,
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
import {getCurrentUser} from "../../store/user/selectors";
import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import AppHeader from "../header/header";

const LoginApp = () => {
    const user = useSelector(getCurrentUser);

    return(
        <>
            <AppHeader/>
            {!user ?
                <main>
                    <Outlet/>
                </main>
                : <Navigate to='/'/>}
        </>

    );
}

export default LoginApp;
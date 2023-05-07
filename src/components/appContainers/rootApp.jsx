import {Outlet} from "react-router-dom";
import AppHeader from "../header/header";

const RootApp = () => {
    return(
        <>
            <AppHeader/>
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default RootApp;
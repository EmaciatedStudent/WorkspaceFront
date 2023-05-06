import AppHeader from "../header/header";
import {Outlet} from "react-router-dom";

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
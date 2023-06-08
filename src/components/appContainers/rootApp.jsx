import {Outlet, useLoaderData} from "react-router-dom";
import AppHeader from "../header/header";
import RequireAuth from "../requireAuth/requireAuth";

const RootApp = () => {
    const {user} = useLoaderData();

    return(
        <>
            <AppHeader/>

            <RequireAuth user={user}>
                <main>
                    <Outlet/>
                </main>
            </RequireAuth>
        </>
    );
}

export default RootApp;
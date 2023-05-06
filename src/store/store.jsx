import {configureStore} from "@reduxjs/toolkit";
import usersSlice from "./user/slice.jsx";


const workspaceStore = configureStore({
    reducer: {
        usersSlice
    }
});

export default workspaceStore;
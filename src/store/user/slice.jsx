import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users : [ ],
    currentUser :  null
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
        },
        logoutUser(state ) {
            state.currentUser = null;
        }
    }
});

export const { setCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;
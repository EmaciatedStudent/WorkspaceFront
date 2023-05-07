import {Navigate, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";

import {setCurrentUser} from "../../store/user/slice";

const RequireAuth = ({user, children}) => {
    const location = useLocation();
    const dispatch = useDispatch();

    if(!user){
        return <Navigate to='/login' state={{from: location}}/>
    } else {
        dispatch(setCurrentUser(user))
        return children;
    }
}

export default RequireAuth
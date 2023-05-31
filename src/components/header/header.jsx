import {Avatar, Dropdown, Navbar} from "flowbite-react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {getCurrentUser} from "../../store/user/selectors";
import {setCurrentUser} from "../../store/user/slice";
import useAuthService from "../../services/authService";

import logo from "../../resourses/logo.png"

const AppHeader = () => {
    const dispatch = useDispatch();
    const user = useSelector(getCurrentUser);

    const navigate = useNavigate();

    const {logOut} = useAuthService();

    const logOutClick = async () => {
        await logOut()
            .then(res => dispatch(setCurrentUser(null))).then(() => navigate('/login'))
            .catch(res => console.log(res));
    }

    return (
        <header>
            <Navbar fluid={true} rounded={true}>
                <Navbar.Brand>
                    <img src={logo}/>
                </Navbar.Brand>

                {user ? <>
                    <div className="flex md:order-2">

                        <Dropdown arrowIcon={true} inline={true} label={<span
                            className="elf-center text-violet-800">{user ? user.name + " " + user.last_name : ""}</span>}>

                            <Dropdown.Divider/>

                            <Dropdown.Item>
                                <Link to={'profile'}>
                                    Личный кабинет
                                </Link>
                            </Dropdown.Item>

                            <Dropdown.Item onClick={logOutClick}>
                                Выход
                            </Dropdown.Item>

                        </Dropdown>
                        <Navbar.Toggle/>
                    </div>
                    <Navbar.Collapse>
                        <Link to={'rooms'}>
                            Переговорные и конференц-залы
                        </Link>
                    </Navbar.Collapse>
                </> : null}
            </Navbar>
        </header>
    );
}

export default AppHeader;
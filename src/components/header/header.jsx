import {Link} from "react-router-dom";
import {Avatar, Dropdown, Navbar} from "flowbite-react";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser} from "../../store/user/selectors";
import {setCurrentUser} from "../../store/user/slice";
import useAuthService from "../../services/authService";

const AppHeader = () => {
    const dispatch = useDispatch();
    const user = useSelector(getCurrentUser);

    const {logOut} = useAuthService();

    const logOutClick = async () => {
        await logOut()
            .then(res => dispatch(setCurrentUser(null)))
            .catch(res => console.log(res));
    }

    return (
        <header>
            <Navbar fluid={true} rounded={true}>
                <Navbar.Brand href="https://flowbite.com/">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/>
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite</span>
                </Navbar.Brand>
                <div className="flex md:order-2">

                    <Dropdown arrowIcon={true} inline={true} label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true}/>}>
                        <Dropdown.Header>
                            <span className="block text-sm">
                                {user? user.name + ' ' + user.last_name : ''}
                            </span>
                            <span className="block truncate text-sm font-medium">
                               {user? user.email : ''}
                            </span>
                        </Dropdown.Header>

                        <Dropdown.Item>
                            Личный кабинет
                        </Dropdown.Item>

                        <Dropdown.Divider/>

                        {
                            user?
                                <Dropdown.Item onClick={logOutClick}>
                                    Sign out
                                </Dropdown.Item>
                                : null
                        }
                    </Dropdown>

                    <Navbar.Toggle/>
                </div>

                <Navbar.Collapse>
                    <Link to={'/'}>
                        Главная
                    </Link>
                    <Link to={'login'}>
                        Логин
                    </Link>
                    <Link to={'registration'}>
                        Регистрация
                    </Link>
                    <Link to={'test'}>
                        Тест
                    </Link>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}

export default AppHeader;
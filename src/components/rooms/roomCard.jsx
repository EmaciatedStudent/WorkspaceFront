import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getCurrentUser} from "../../store/user/selectors";

const RoomCard = ({room}) => {
    const user = useSelector(getCurrentUser);

    const {id, name, type, office} = room;

    return (
        <div
            className="m-4 flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow">
            <Link to={id}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{name} ({office} каб.)</h5>
            </Link>
            <Link to={id}
                  className="self-end inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-800 rounded-lg hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-500 ">
                Расписание
                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path>
                </svg>
            </Link>
            {user.group.name === "Администратор" ?
                <Link to={id}
                      className="mt-2 self-end inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-800 rounded-lg hover:bg-violet-900 focus:ring-4 focus:outline-none focus:ring-violet-500 ">
                    Редактировать
                </Link>
                 : null}
        </div>
    )
}

export default RoomCard;

import useUserService from "../../services/userService";

export async function RootLoader() {
    const {getUser} = useUserService();

    let user = await getUser().then(res => res.user? res.user : null)
        .catch(res => console.log(res));

    // const userForLocal = {
    //     name: 'Яна',
    //     last_name: 'Лапердина',
    //     login: 'admin',
    //     email: 'test@legacystudio.ru'};
    // user = user? user : userForLocal;

    return {user};
}
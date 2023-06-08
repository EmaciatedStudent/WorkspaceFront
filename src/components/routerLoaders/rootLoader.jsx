import useUserService from "../../services/userService";

export async function RootLoader() {
    const {getUser} = useUserService();

    let user = await getUser().then(res => res.user? res.user : null)
        .catch(res => console.log(res));

    console.log(user);

    return {user};
}
import store from "../../store/store";

const Authorization = () => {
    const login = store.getState().login;
    const password = store.getState().password;

    return (<p>Hello World</p>);
}

export default  Authorization;
import logo from './logo.svg';
import './App.css';
import Test from './components/test_reg/test';

function App() {
    const register = async () => {
        let data = {
            "login" : "testik25",
            "name" : "testik",
            "lastname" : "testik",
            "password" : "testik",
            "confirm_password" : "testik1",
            "email" : "testik@mail.ru",
            "group" : "4"
        };

        let res = await fetch( 'http://workspace.devaid.ru/api/Auth.Registration', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(json => console.log(json));
    }

    const login = async () => {
        let data = {
            "login" : "testik8",
            "password" : "testik",
            "remember" : "Y"
        };

        let res = await fetch('http://workspace.devaid.ru/api/Auth.Login', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(json => console.log(json));
    }

    const loginByHash = async () => {
        // let data = {
        //     "login" : "testik8",
        //     "password" : "testik"
        // };

        let res = await fetch('http://workspace.devaid.ru/api/Auth.LoginByHash', {
            method: 'POST'
        }).then(response => response.json())
            .then(json => console.log(json));
    }

    const auth = async () => {
        let data = {
            "user_id" : '1'
        };

        let res = await fetch('http://workspace.devaid.ru/api/Auth.Authorize',{
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(json => console.log(json))
    }

    const info = async () => {
        let res = await fetch('http://workspace.devaid.ru/api/Auth.GetUserInfo', {
            method: 'POST'
        }).then(response => response.json())
            .then(json => console.log(json))
    }

  return (
    <div className="App">
        <button onClick={register}>Регистрация</button>
        <button onClick={login}>Log in</button>
        <button onClick={auth}>Auth</button>
        <button onClick={info}>Info</button>
        <button onClick={loginByHash}>Хэш</button>
      <Test></Test>
    </div>
  );
}

export default App;

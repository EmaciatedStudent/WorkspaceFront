import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/style.scss';
import App from './components/app/App';
import {Provider} from "react-redux";
import Store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={Store}>
            <App />
        </Provider>
    </React.StrictMode>
);

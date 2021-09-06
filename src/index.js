import React from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css';
import App from "./App";
import {Provider} from "react-redux";
import {store} from "./redux/redux-store";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);


import './Style.scss';
import './StyleShop.scss';
import './react-input-range.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import store from "./Stores/ShopStore";
import App from './components/App.jsx'
render(
    <Provider store = {store}>
		<App/>
	</Provider>,
    document.getElementById('app'));

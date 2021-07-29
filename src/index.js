import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import setupAxios from 'api/setup-axios';
import store from 'redux/store';
import AppProviders from 'providers/AppProviders';
import App from './App';
import './index.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '_metronic/_assets/plugins/flaticon/flaticon.css';
import '_metronic/_assets/plugins/flaticon2/flaticon.css';
import '_metronic/_assets/plugins/keenthemes-icons/font/ki.css';
import 'socicon/css/socicon.css';

setupAxios(axios, store);

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root'),
);

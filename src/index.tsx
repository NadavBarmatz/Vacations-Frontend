import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Components/LayoutArea/Layout/Layout';
import './index.css';
import './generalMediaQueries.css';
import reportWebVitals from './reportWebVitals';
import interceptorsService from './Services/interceptorsService';
import socketIoService from './Services/SocketIoService';

interceptorsService.createInterceptors();

socketIoService.connect();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

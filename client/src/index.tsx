import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';

import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      <title>Cinema Booking System</title>
      <meta name="description" content={'APP_DESCRIPTION'} />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Helmet>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

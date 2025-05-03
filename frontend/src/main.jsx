import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import "./sass/main.scss";
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <App />
  //</StrictMode>,
);


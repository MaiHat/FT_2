import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.jsx';
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <App />
  //</StrictMode>,
);


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Monter l'application React dans l'élément avec l'ID 'hello-world-root'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('hello-world-root')
);
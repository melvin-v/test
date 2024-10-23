import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyles } from './styles/GlobalStyles'; // Importa GlobalStyles

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles /> {/* Aplica los estilos globales */}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

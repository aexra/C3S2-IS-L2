import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './envelope/variables.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './envelope/contexts/ThemeContexts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App/>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();

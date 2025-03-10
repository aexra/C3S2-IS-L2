import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './react-envelope/variables.css';
import './react-envelope/styles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LabProvider } from './Contexts/LabContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LabProvider>
      <App/>
    </LabProvider>
  </React.StrictMode>
);

reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="guide-line">
      <App />
    </div>
  </React.StrictMode>,
);

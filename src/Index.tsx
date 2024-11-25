import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <RecoilRoot>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </RecoilRoot>
  </HelmetProvider>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './web/index.css';
import App from './web/App';
import ProductPage from './web/ProductPage';
import ErrorBoundary from './web/ErrorBoundary';
import ImgPage from './web/ImgPage';

const routing = (
  <BrowserRouter history="">
    <div>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/products/">
            <Route path=":id" element={<ProductPage />} />
          </Route>
          <Route path="/img/">
            <Route path=":id" element={<ImgPage />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </div>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(routing);

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
const rootNode = document.getElementById('app');
// import ErrorBoundary from './components/ErrorBoundary';
if (rootNode) {
  createRoot(rootNode).render(
    <BrowserRouter>
      {/* <ErrorBoundary errorMessage="An unknown error occurred. Please try again later."> */}
      <App />
      {/* </ErrorBoundary> */}
    </BrowserRouter>
  );
}

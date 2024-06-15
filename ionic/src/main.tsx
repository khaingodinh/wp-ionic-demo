import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initialize } from './utils/sessionStore';

const container = document.getElementById('root');
const root = createRoot(container!);
initialize().then(() => {
  root.render(
    <App />
  );
});
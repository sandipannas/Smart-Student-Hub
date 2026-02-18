import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import UserData from './components/userdetails';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App /> 
    <UserData/>
  </StrictMode>
);

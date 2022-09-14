import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import './styles/App.css';
import './styles/SearchBar.css';
import './styles/Sidebar.css';
import './styles/SidebarRow.css';
import './styles/VideoList.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

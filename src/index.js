import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import './styles/App.css';
import './styles/FilteredList.css';
import './styles/Home.css';
import './styles/SearchBar.css';
import './styles/Sidebar.css';
import './styles/SidebarRow.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

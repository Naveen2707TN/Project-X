import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Register from './Pages/Register';
import Verify from './Pages/Verify';
import Home from './Pages/Home';
import DashBoard from './Pages/Dashboard';
import Upload from './Pages/upload';
import Files from './Pages/Files';
import Settings from './Pages/Settings';

const routers = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },{
    path: "/sign-up",
    element: <Register />
  },{
    path: "/verify",
    element: <Verify />
  },{
    path: "/home",
    element: <Home/>,
    children: [
      {index: true, element: <DashBoard />},
      {path: "upload", element: <Upload />},
      {path: "files", element: <Files />},
      {path: "settings", element: <Settings />}
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routers} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

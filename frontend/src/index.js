import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Register from './Pages/Register';
import Verify from './Pages/Verify';
import Home from './Pages/Home';
import Upload from './Pages/upload';
import Files from './Pages/Files';
import Settings from './Pages/Settings';
import Storage from './Pages/Storage';
import Share from './Pages/Share';
import Logout from './Component/logout';
import Reset from './Component/reset';
import Error from './Component/Error';

const routers = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Error />
  },{
    path: "/sign-up",
    element: <Register />,
    errorElement: <Error />
  },{
    path: "/verify",
    element: <Verify />,
    errorElement: <Error />
  },{
    path: "/home",
    element: <Home/>,
    children: [
      {index: true, element: <Upload />},
      {path: "storage", element: <Storage />},
      {path: "files", element: <Files />},
      {path: "settings", element: <Settings />},
      {path: "logout", element: <Logout />}
    ]
  },{
    path: "/share",
    element: <Share />,
    errorElement: <Error />
  },{
    path:"/reset",
    element: <Reset />,
    errorElement: <Error />
  },{
    path:"/err",
    element: <Error />
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

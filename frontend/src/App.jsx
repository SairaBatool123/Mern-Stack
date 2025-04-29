import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
// import Header from './components/UI/Header';
// import Footer from './components/UI/Footer';
import LoginPage from './Pages/LoginPage';
import SignUp from './Pages/Signup'; 
import Logout from "./Pages/Logout" 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Signup from './Pages/Signup';
import Login from './Pages/LoginPage';
import ProtectedRoutes from './utils/propectedRoutes';
import { ErrorPage } from './Pages/ErrorPage.jsx';
import TaskDashboard from './components/Layout/TaskDashboard.jsx';
// bootstrap 
// import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  // const navigate = useNavigate();
  // // const location = useLocation();
  // // const adminPage = location.pathname === '/admin'; 
    return (
      <>
        {/* All Routes Created Like this */}
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<TaskDashboard />} />

          {/* Protected Routes */}
          {/* <Route element={<ProtectedRoutes />}> */}
          {/* <Route path="/product" element={<Product />} /> */}
          {/* <Route path="/about" element={<About />} />*/}
          {/* <Route path="/contact" element={<Contact />} /> */}
          {/* </Route> */}

          {/* PROTECTED ROUTES  */}
          {/* <Route element={ProtectedRoutes}> */}
          {/* just for product about and contact  */}
          {/* </Route> */}

          {/* 404 Error Page */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </>
    );
};

export default App;
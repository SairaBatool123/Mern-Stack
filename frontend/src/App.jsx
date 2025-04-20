import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import LoginPage from './Pages/LoginPage';
import SignUp from './Pages/Signup'; 
import Logout from "./Pages/Logout" 
import Admin from "./Pages/AdminPage"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Signup from './Pages/Signup';
import Login from './Pages/LoginPage';
import ProtectedRoutes from './utils/propectedRoutes';

const App = () => {
  const location = useLocation();
  const adminPage = location.pathname === '/admin'; 
    return (
      <>
        {!adminPage && <Header />}
        <Routes>
          {/* All Routes Created Like this */}
          {/* <Route path="/" element={<Home />} /> */}

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<Logout />} />
          <Route path="/admin" element={<Admin />} />
          
          {/* PROTECTED ROUTES  */}
          <Route element={ProtectedRoutes}>
            {/* just for product about and contact  */}
          </Route>
        </Routes>
        {!adminPage && <Footer />}
      </>
    );
};

export default App;
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Todo from "./components/Todo";
import PrivateRoute from "./components/PrivateRoute";
import AuthRoute from "./components/AuthRoute";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";


const App = () =>{

  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div>
    <ToastContainer/>
    <Routes>
        <Route path="/" element={<AuthRoute><Home/></AuthRoute>} />
        <Route path="/register" element={<AuthRoute><Register/></AuthRoute>} />
        <Route path="/login" element={ <AuthRoute><Login/></AuthRoute>} />
        <Route 
          path="/todo" 
          element={ 
            <PrivateRoute>
              <Todo/>
            </PrivateRoute>
            } 
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/todo" : "/"} />} />
      </Routes>
    </div>

  );
}

export default App;

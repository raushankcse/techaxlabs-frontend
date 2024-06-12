import React from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({children}) =>{
  const isAuthenticated = !!localStorage.getItem('token')

  return isAuthenticated ? <Navigate replace to="/todo" /> : children;
};

export default AuthRoute;
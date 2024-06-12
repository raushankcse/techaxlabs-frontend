import React, {useState, useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import './Login.css';
import config from "../../config";

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const location = useLocation();
  const navigate = useNavigate();
  const successMessage = location.state?.message;


  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage,{
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [successMessage]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await fetch(`${config.baseURL}/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();

      if(response.ok){
        localStorage.setItem('token', data.token);
        toast.success('Logged in successfully!',{
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/todo');
      }else{
        toast.error(data.error || 'An error occurred',{
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      
    } catch(error){
      toast.error(error.message || 'An error occurred',{
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  };


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3"> 
        <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="text" 
            className="form-control"
            id="email"
            name="email"
            value={FormData.email}
            onChange={handleChange}

          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={FormData.password}
            onChange={handleChange}

          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <p className="mt-3">
        Don't have an account? <Link to="/register" replace>Register</Link>
      </p>
    </div>
  )
}


export default Login;

import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import './Register.css';
import config from "../../config.js";


const Register = () => {

  const [formData, setFormData]= useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const validateForm = () => {
    let formErrors = {};
    if(!formData.username) formErrors.username = 'Username is required';
    if(!formData.email) formErrors.email = 'Email is required';
    if(!formData.password) formErrors.password = 'Password is required';
    if(formData.password !== formData.confirmPassword) formErrors.confirmPassword = 'Passwords do not match';
    return formErrors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if(Object.keys(formErrors).length > 0){
      setErrors(formErrors);
    } else{
      try{
        const response = await fetch(`${config.baseURL}/register`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password
          }),

        });

        const data = await response.json();

        if(response.ok){
          toast.success('User registered successfully!',{
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate('/login');
          

        } else{
          setErrors({server: data.error || 'Unexpected response from the server'});
        }

      
      } catch(error){
        setErrors({server:error.message || 'An error occurred'});
      }
    }
  };


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input 
            type="text" 
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <div className="text-danger">{errors.username}</div>}

        </div>
        <div className="mb-3"> 
          <label htmlFor="email" className="form-label">Email address</label>
          <input 
            type="text" 
            className="form-control" 
            id="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}

        </div>
        <div className="mb-3"> 
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="text-danger">{errors.password}</div>}
        </div>
        <div className="mb-3"> 
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
        </div>
        {errors.server && <div className="text-danger mb-3">{errors.server}</div>}
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login" replace>Login</Link>
      </p>

    </div>
  )
}


export default Register;
import React from "react";
import {useNavigate} from 'react-router-dom';
import './Home.css';

const Home = () => {

  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login')
  };
  return (
    <div className="home-container">
      <h1>Todo App</h1>
     
        <p>Your journey starts here.</p>
        <button className="btn btn-primary" onClick={handleGetStarted}>
          Get Started
        </button>
    </div>

  );
};

export default Home;


import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };
  return (
    <div className="home-container">
      <div className="home-contents">
        <h1 className="text-blue-600">Multi-User Tasks Manager</h1>
        <p>Manage and save your daily tasks</p>
        <button className="btn btn-primary" onClick={handleGetStarted}>
          Add Tasks
        </button>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <div className="bg-light p-3">
        <div className="d-flex justify-content-end">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="vh-100 d-flex justify-content-center align-items-center bg-light flex-column">
        <h1 className="text-success">Welcome,{user?.email?.split("@")[0]}</h1>
        <p className="time">
          Logged in at: {new Date(user?.loginTime).toLocaleString()}
        </p>
      </div>
    </>
  );
}

export default Dashboard;

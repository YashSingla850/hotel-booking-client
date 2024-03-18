import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = function (e) {
    e.preventDefault();
    axios
      .post("http://localhost:8600/api/auth/login", {
        username: userName,
        password: password,
      })
      .then((result) => {
        if (result.data.message == "Login successful") {
          localStorage.setItem("currentUser", JSON.stringify(result));
          navigate("/home");
        }
        console.log(result);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userName">
              <strong>UserName</strong>
            </label>
          </div>
          <input
            type="text"
            className="form-control rounded-0 mb-2"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
          </div>
          <input
            type="password"
            className="form-control rounded-0 mb-2"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-success w-100 rounded-0">Login</button>
        </form>
        <p>Don't Have an Account</p>
        <Link
          to="/register"
          className="btn btn-default border w-100 bg-light rounder-0 text-decoration-none"
        >
          register
        </Link>
      </div>
    </div>
  );
};

export default Login;

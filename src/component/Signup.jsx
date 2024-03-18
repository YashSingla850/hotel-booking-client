import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = ({ setUser }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = function (e) {
    e.preventDefault();
    axios
      .post("http://localhost:8600/api/auth/register", {
        username: userName,
        password: password,
      })
      .then((result) => {
        console.log(result);
        // setUser(result);
        alert("Register Successfully");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        alert("Use Already Existed");
      });
  };
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
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
          <button className="btn btn-success w-100 rounded-0">Register</button>
        </form>
        <p>Already Have an Account</p>
        <Link
          to="/login"
          className="btn btn-default border w-100 bg-light rounder-0 text-decoration-none"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../components/controllers/CustomButton";
import logo from "../assets/images/logo_big.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setUsername("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 bg-white rounded-lg shadow-md text-left w-full max-w-md">
        <div className="flex justify-center items-center mb-6">
          <img className="w-24" src={logo} alt="logo" />
        </div>
        <h3 className="text-2xl font-bold text-center">Welcome!</h3>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mt-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-center mt-4">
            <CustomButton text="Login" handleClick={() => navigate("/dashboard")}></CustomButton>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link className="text-blue-500 hover:text-blue-800 font-bold" to="/register">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

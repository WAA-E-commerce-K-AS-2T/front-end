import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../components/controllers/CustomButton";

import { useDispatch } from "react-redux";
import { setLoading } from "./../redux/actions";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authType, setAuthType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    const data = {
      email: email,
      fullName: username,
      password: password,
      authtype: authType,
    };

    try {
      await axios.post("http://localhost:8080/signup", data);
      alert("Registered successfully");
      navigate("/login");
      dispatch(setLoading(false));
    } catch (err) {
      console.error(err);
      dispatch(setLoading(false));
    }

    setUsername("");
    setPassword("");
    setEmail("");
    setAuthType("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 bg-white rounded-lg shadow-md text-left w-full max-w-md">
        <h3 className="text-2xl font-bold text-center">Register</h3>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Enter an email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-6">
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
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
          <div className="mt-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              User type
            </label>
            <div className="flex gap-4 items-center">
              <input
                type="radio"
                value="SELLER"
                label="Seller"
                name="authType"
                checked={authType === "SELLER"}
                onChange={(e) => setAuthType(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-teal-600 focus:ring-2"
              />
              <label for="seller">Seller</label>
              <input
                type="radio"
                value="BUYER"
                name="authType"
                checked={authType === "BUYER"}
                onChange={(e) => setAuthType(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-teal-600 focus:ring-2"
              />
              <label for="buyer">Buyer</label>
            </div>
          </div>

          <div className="flex items-center justify-center mt-6">
            <CustomButton text="Register" type="submit"></CustomButton>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Are you already?
              <Link
                className="text-blue-500 hover:text-blue-800 font-bold"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

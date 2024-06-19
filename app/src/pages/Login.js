import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../components/controllers/customButton";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "./../redux/actions";
import { decodeToken } from "../utils/token";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const data = {
      email: email,
      password: password,
    };
    console.log(data);
    axios.post("http://localhost:8080/login", data).then((response) => {
      setLoading(false);
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        const user = decodeToken(token);
        console.log(user);
        dispatch(setUser(user));
        navigate("/");
      } else {
        alert("Error");
      }
    });

    setEmail("");
    setPassword("");
  };

  const handleOnClick = () => {
    navigate("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 bg-white rounded-lg shadow-md text-left w-full max-w-md">
        <h3 className="text-2xl font-bold text-center">Welcome!</h3>
        <form className="mt-4" onSubmit={login}>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email">
              email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password">
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
            <CustomButton text="Login" type="submit"></CustomButton>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm" onClick={handleOnClick}>
            Don't have an account?{" "}
            <Link
              className="text-blue-500 hover:text-blue-800 font-bold"
              to="/register">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

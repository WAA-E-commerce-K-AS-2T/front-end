import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../components/controllers/CustomButton";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAddress, setLoading, setUser } from "../../redux/actions";
import toast from "react-hot-toast";

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

    axios
      .post("http://localhost:8080/login", data)
      .then((response) => {
        const { token, user } = response.data;
        user.auth_type =
          user.roles[0].name === "ROLE_SELLER"
            ? "seller"
            : user.roles[0].name === "ROLE_BUYER"
            ? "buyer"
            : user.roles[0].name === "ROLE_SYSTADM"
            ? "admin"
            : "";
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        if (user.roles[0].name === "ROLE_BUYER") {
          axios
            .get("http://localhost:8080/api/v1/buyers/address", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              localStorage.setItem("address", JSON.stringify(res.data));
            })

            .catch((err) => console.log(err));
        }

        dispatch(setUser(user));
        navigate(user.auth_type === "admin" ? "/admin/products" : user.auth_type === "seller" ? "/seller/products" : "/");
      })
      .catch((error) => {
        toast.error("Username or password is wrong!");
        console.log("Error", error);
      })
      .finally(() => {
        dispatch(setLoading(false));
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
            <CustomButton text="Login" type="submit"></CustomButton>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm" onClick={handleOnClick}>
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

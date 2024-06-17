import { Route, Routes, Redirect } from "react-router";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { useSelector } from "react-redux";

export default function PageRoutes(props) {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  return <Routes>{loggedIn ? <Redirect to="/dashboard" /> : <Login />}</Routes>;
}

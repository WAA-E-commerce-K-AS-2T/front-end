import { Route, Routes, Navigate } from "react-router";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

const PageRoutes = (props) => {
  return (
    <Routes>
      {/* <Route path="/" element={<Dashboard />}></Route>
      <Route path="/login" element={<Login />}></Route> */}
    </Routes>
  );
  //   return <Routes>{loggedIn ? <Navigate to="/dashboard" /> : <Login />}</Routes>;
};

export default PageRoutes;

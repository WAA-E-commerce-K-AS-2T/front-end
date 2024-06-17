import { Route, Routes } from "react-router";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";

const PageRoutes = (props) => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }
      /> */}
    </Routes>
  );
};

export default PageRoutes;

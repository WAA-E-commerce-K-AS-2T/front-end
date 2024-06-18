import { Route, Routes } from "react-router";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";
import ProductDetails from "../pages/ProductDetails";
import Products from "../pages/Products";

const PageRoutes = (props) => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetails />} />

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

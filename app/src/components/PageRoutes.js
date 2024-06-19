import { Route, Routes } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "../pages/Dashboard";
import Layout from "./layouts/Layout";
import AddProduct from "../pages/seller/AddProduct";
import Products from "../pages/seller/Products";
import Sidebar from "./layouts/Sidebar";
import Purchases from "../pages/seller/Orders";
import Reviews from "../pages/seller/Reviews";
import Orders from "../pages/seller/Orders";

const PageRoutes = (props) => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile/seller" />
        <Route
          path="/user/*"
          element={
            <ProtectedRoutes>
              <Route path="/cart" element={<Dashboard />} />
              <Route path="/profile" />
            </ProtectedRoutes>
          }
        />
        <Route path="/seller/*">
          <Route path="products" element={<Products />} />
          <Route path="order" element={<Orders />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="addProduct" element={<AddProduct />} />
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              <Route path="/addItem" />
              <Route path="/list" />
            </ProtectedRoutes>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default PageRoutes;

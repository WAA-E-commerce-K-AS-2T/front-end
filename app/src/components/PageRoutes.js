import { Route, Routes } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import ProductDetails from "../pages/ProductDetails";
import Products from "../pages/Products";
import Dashboard from "../pages/Dashboard";
import Layout from "./layouts/Layout";
import AddProduct from "../pages/seller/addProduct";

const PageRoutes = (props) => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile/seller" />
        <Route
          path=""
          element={
            <ProtectedRoutes>
              <Route path="/cart" element={<Dashboard />} />
              <Route path="/profile" />
            </ProtectedRoutes>
          }
        />
        <Route path="/seller/*">
          <Route path="list" element={<AddProduct />} />
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
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageRoutes;

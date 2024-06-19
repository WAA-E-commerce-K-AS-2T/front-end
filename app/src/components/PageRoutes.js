import { Route, Routes } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import ProductDetails from "../pages/ProductDetails";
import Dashboard from "../pages/Dashboard";
import Layout from "./layouts/Layout";
import Products from "../pages/seller/Products";
import Reviews from "../pages/seller/Reviews";
import Orders from "../pages/seller/Orders";
import Profile from "../pages/buyer/Profile";
import ProductBuy from "../pages/Products";
import AddProduct from "../pages/seller/addProduct";
import ProductCart from "../pages/ProductCart";
import ShippingForm from "./cartComponents/ShippingForm";

const PageRoutes = (props) => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      <Route element={<Layout />}>
        <Route path="/products" element={<ProductBuy />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/user/*">
          <Route
            path="dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
        </Route>

        <Route path="/profile/seller" />
        <Route path="/cart" element={<ProductCart />} />

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
          <Route
            path="products"
            element={
              <ProtectedRoutes>
                <Products />
              </ProtectedRoutes>
            }
          />
          <Route
            path="order"
            element={
              <ProtectedRoutes>
                <Orders />
              </ProtectedRoutes>
            }
          />
          <Route
            path="reviews"
            element={
              <ProtectedRoutes>
                <Reviews />
              </ProtectedRoutes>
            }
          />
          <Route
            path="addProduct"
            element={
              <ProtectedRoutes>
                <AddProduct />
              </ProtectedRoutes>
            }
          />
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
        <Route path="/shipping" element={<ShippingForm />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageRoutes;

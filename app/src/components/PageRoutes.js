import { Route, Routes } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "../pages/Dashboard";
import Layout from "./layouts/Layout";
import AddProduct from "../pages/seller/products/AddProduct";
import Products from "../pages/seller/products/Products";
import Reviews from "../pages/seller/Reviews";
import Orders from "../pages/seller/Orders";
import Profile from "../pages/buyer/Profile";
import ProductBuy from "../pages/buyer/ProductBuy";
import ProductCart from "../pages/buyer/ProductCart";
import ShippingForm from "./cartComponents/ShippingForm";
import ProductDetails from "../pages/buyer/ProductDetails";
import EditProduct from "../pages/seller/products/EditProduct";

const PageRoutes = (props) => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<Layout />}>
        <Route path="/" element={<ProductBuy />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/" element={<ProductDetails />} />
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
          <Route
            path="editProduct/:id"
            element={
              <ProtectedRoutes>
                <EditProduct />
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
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageRoutes;

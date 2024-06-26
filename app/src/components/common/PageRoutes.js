import { Route, Routes } from "react-router";
import Login from "../../pages/user/Login";
import Register from "../../pages/user/Register";
import NotFound from "../../pages/NotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import Layout from "../layouts/Layout";
import AddProduct from "../../pages/seller/products/AddProduct";
import Products from "../../pages/seller/products/Products";
import AdminProducts from "../../pages/admin/Products";
import Reviews from "../../pages/admin/Reviews";
import Orders from "../../pages/seller/Orders";
import ProductCart from "../../pages/buyer/ProductCart";
import Profile from "../../pages/user/Profile";
import EditProduct from "../../pages/seller/products/EditProduct";
import EditProfile from "../../pages/user/EditProfile";
import ShippingForm from "../cartComponents/ShippingForm";
import SearchResult from "../../pages/buyer/SearchResult";
import ProductBuy from "../../pages/buyer/ProductBuy";
import ProductDetails from "../../pages/buyer/ProductDetails";
import OrderHistory from "../cartComponents/OrderHistory";

const PageRoutes = (props) => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<Layout />}>
        <Route path="/" element={<ProductBuy />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/shipping" element={<ShippingForm />} />
        <Route path="/cart" element={<ProductCart />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/order" element={<OrderHistory />} />
        <Route path="/user/*">
          <Route
            path="profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="editProfile"
            element={
              <ProtectedRoutes>
                <EditProfile />
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
          path="/admin/*"
          element={
            <ProtectedRoutes>
              <Route path="/addItem" />
              <Route path="/list" />
            </ProtectedRoutes>
          }
        />
        <Route path="/admin/*">
          <Route
            path="products"
            element={
              <ProtectedRoutes>
                <AdminProducts />
              </ProtectedRoutes>
            }
          />
          <Route
            path="review"
            element={
              <ProtectedRoutes>
                <Reviews />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageRoutes;

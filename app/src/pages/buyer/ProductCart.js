import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import CartItemsList from "../../components/cartComponents/CartItemsList";
import OrderSummary from "../../components/cartComponents/OrderSummary";
import CustomButton from "../../components/controllers/CustomButton";
import axios from "axios";
import { useEffect } from "react";

const ProductCart = () => {
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [isChanging, setIsChanging] = useState(false);

  const handleBuyClick = () => {
    setIsSummaryVisible(true);
  };

  const handleCheckout = () => {
    setIsSummaryVisible(true);
  };

  const getUserCart = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/api/v1/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCart(res.data))
      .catch((err) => console.log(err));
  };

  const handleDownloadReceipt = () => {
    const receiptContent = "Receipt content here";
    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "receipt.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRemove = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/cart/cartItems/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsChanging(!isChanging);
    } catch (err) {
      console.log(err);
    }
  };

  const handleIncrement = async (id) => {
    const token = localStorage.getItem("token");
    const data = {
      productId: id,
      quantity: 1,
    };
    try {
      await axios.post("http://localhost:8080/api/v1/cart/cartItems", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsChanging(!isChanging);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecrement = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/cart/cartItems/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsChanging(!isChanging);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserCart();
  }, [isChanging]);

  return (
    <div className="container p-4">
      <Breadcrumb />
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="lg:w-2/3">
          <h2 className="text-lg text-left font-medium text-gray-900 p-2 mb-4">
            Your Cart items
          </h2>
          <CartItemsList
            cartItems={cart?.items}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            handleRemove={handleRemove}
          />
          {isSummaryVisible && (
            <div className="mt-6">
              <CustomButton
                text="Proceed to Checkout"
                handleClick={handleCheckout}
              />
            </div>
          )}
        </div>
        <OrderSummary
          total={cart?.totalPrice}
          handleBuyClick={handleBuyClick}
        />
      </div>
    </div>
  );
};

const cartItems = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    price: 90.0,
    quantity: 1,
    color: "Salmon",
    image:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    price: 32.0,
    quantity: 1,
    color: "Blue",
    image:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
  },
];

export default ProductCart;

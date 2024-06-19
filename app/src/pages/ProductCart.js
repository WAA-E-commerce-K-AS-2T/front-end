import React, { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import CartItemsList from "../components/cartComponents/CartItemsList";
import OrderSummary from "../components/cartComponents/OrderSummary";
import CustomButton from "../components/controllers/CustomButton";

const ProductCart = () => {
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  const handleBuyClick = () => {
    setIsSummaryVisible(true);
  };

  const handleCheckout = () => {
    setIsSummaryVisible(true);
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

  const handleRemove = (id) => {
    // Handle item removal
  };

  const handleIncrement = (id) => {
    // Handle increment
  };

  const handleDecrement = (id) => {
    // Handle decrement
  };

  return (
    <div className="container p-4">
      <Breadcrumb />
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="lg:w-2/3">
          <h2 className="text-lg text-left font-medium text-gray-900 p-2 mb-4">Your Cart items</h2>
          <CartItemsList cartItems={cartItems} handleIncrement={handleIncrement} handleDecrement={handleDecrement} handleRemove={handleRemove} />
          {isSummaryVisible && (
            <div className="mt-6">
              <CustomButton text="Proceed to Checkout" handleClick={handleCheckout} />
            </div>
          )}
        </div>
        <OrderSummary handleBuyClick={handleBuyClick} />
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
    image: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    price: 32.0,
    quantity: 1,
    color: "Blue",
    image: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
  },
];

export default ProductCart;

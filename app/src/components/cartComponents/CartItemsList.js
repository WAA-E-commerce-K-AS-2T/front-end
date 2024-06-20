import React from "react";
import CartItem from "./CartItem";

const CartItemsList = ({
  cartItems,
  handleIncrement,
  handleDecrement,
  handleRemove,
}) => {
  return (
    <div className="space-y-4">
      {cartItems?.map((item, index) => (
        <CartItem
          key={index}
          item={item}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          handleRemove={handleRemove}
        />
      ))}
    </div>
  );
};

export default CartItemsList;

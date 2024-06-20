import React from "react";

const CartItem = ({ item, handleIncrement, handleDecrement, handleRemove }) => {
  const { id, productId, quantity, price } = item;

  return (
    <div className="flex flex-col border border-gray-200 rounded-md p-4 shadow-sm">
      <div className="flex items-center">
        <div className="h-24 w-24 rounded-md border border-gray-200">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="ml-4 flex flex-1 flex-col">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item?.name}</h3>
            <p>${price}</p>
          </div>
          <p className="text-gray-500 flex justify-center mr-2">
            Qty {quantity}
          </p>

          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="mt-1 text-sm text-gray-500">{item.color}</p>
            <div className="flex items-center justify-between text-sm mt-2">
              <div className="flex items-center justify-center space-x-2">
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                  onClick={() => handleDecrement(productId)}
                >
                  -
                </button>
                <span className="text-gray-900">{item.quantity}</span>
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                  onClick={() => handleIncrement(productId)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex">
              <button
                type="button"
                className="font-medium text-teal-600 hover:text-teal-500"
                onClick={() => handleRemove(id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

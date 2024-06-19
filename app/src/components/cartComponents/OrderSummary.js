import React from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router";

const OrderSummary = () => {
  const navigate = useNavigate();
  return (
    <div className="lg:w-1/3">
      <h2 className="text-lg font-medium text-gray-900 mb-4 p-2">
        Order Summary
      </h2>
      <div className="border border-gray-200 rounded-md p-4 shadow-sm">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>$262.00</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="my-6">
          <button
            onClick={() => navigate("/shipping")}
            className="bg-black rounded-md border border-transparent hover:bg-teal-600 px-4 py-2 text-base font-medium text-white">
            Checkout
          </button>
        </div>
        <p>or</p>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            <button
              type="button"
              className="bg-white rounded-md text-black font-medium px-4 py-2 hover:bg-teal-600">
              Continue Shopping
              <ChevronRightIcon
                className="h-5 w-5 inline ml-1"
                aria-hidden="true"
              />
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

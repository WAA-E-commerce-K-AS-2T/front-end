import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import { orderHistoryData } from "../../utils/data";

const OrderHistory = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>

      {orderHistoryData.map((order) => (
        <div key={order.id} className="border rounded-lg mb-4 shadow-md">
          <div className="bg-teal-700 p-4 rounded-t-lg text-white">
            <div className="flex justify-evenly mb-2">
              <div className="flex flex-col">
                <div className="flex items-center text-lg font-semibold">
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  Order Id: {order.id}
                </div>
                <p>
                  <span className="text-md font-semibold">Total: </span>
                  <span className="text-lg">${order.total.toFixed(2)}</span>
                </p>
              </div>
              <div className="text-right">
                <span className="block text-sm">
                  Delivered on: {order.date}
                </span>
                <span className="block text-center text-sm">
                  To: {order.deliveredTo}
                </span>
              </div>
              <div className="text-right">
                <span
                  className={`${
                    order.status === "Delivered"
                      ? "text-green-500"
                      : "text-yellow-500"
                  } text-sm font-medium`}>
                  {order.status}
                </span>
                <div className="mt-2">
                  <span className="text-md">Payment Mode: </span>
                  <span>{order.paymentMode}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white rounded-b-lg">
            <div className="mt-4 flex justify-around">
              <div>
                <h2 className="text-md font-semibold mb-2">Products:</h2>
                <ul className="list-inside text-sm text-gray-700 mb-4">
                  {order.products.map((product, index) => (
                    <React.Fragment key={index}>
                      <li>
                        {product.name} - Quantity: {product.quantity}
                      </li>
                      {index < order.products.length - 1 && (
                        <hr className="my-2 border-gray-200" />
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => {}}
                  className="px-4 m-4 text-sm font-medium text-gray-700 bg-white border-2 border-gray-700 rounded-md hover:bg-gray-300">
                  Cancel Order
                </button>
                <button
                  onClick={() => {}}
                  className="px-4 m-4 text-sm font-medium text-white bg-black rounded-md hover:bg-teal-700 ">
                  Download Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;

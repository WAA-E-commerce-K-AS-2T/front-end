import React, { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const OrderHistory = () => {
  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    const path = user.auth_type === "seller" ? "http://localhost:8080/api/v1/sellers/orderItems" : "http://localhost:8080/api/v1/orders";
    axios
      .get(path, { headers: { authorization: `Bearer ${token}` } })
      .then((response) => {
        setOrders(response.data);
      })
      .catch(() => {
        toast.error("Error");
      });
  };
  const cancelItem = (id) => {
    axios
      .put(`http://localhost:8080/api/v1/orders/${id}/cancel`, { headers: { authorization: `Bearer ${token}` } })
      .then((response) => {
        setOrders(response.data);
        toast.success("Successfully canceled!");
      })
      .toast.error("Error");
  };
  const changeStatus = (id) => {
    axios
      .put(`http://localhost:8080/api/v1/orders/${id}/status`, { headers: { authorization: `Bearer ${token}` } })
      .then((response) => {
        setOrders(response.data);
        toast.success("Success proceeded!");
      })
      .toast.error("Error");
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>

      {orders.map((order) => (
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
                  <span className="text-lg">${order.amount}</span>
                </p>
              </div>

              <div className="text-right">
                <span className={`${order.status === "Delivered" ? "text-green-500" : "text-yellow-500"} text-sm font-medium`}>{order.status}</span>
                <div className="mt-2">
                  <span className="text-md">Payment Method: </span>
                  <span>{order.paymentMethod}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white rounded-b-lg">
            <div className="mt-4 flex justify-around">
              <div>
                <h2 className="text-md font-semibold mb-2">Products:</h2>
                <ul className="list-inside text-sm text-gray-700 mb-4">
                  {order.orderItems.map((product, index) => (
                    <React.Fragment key={index}>
                      <li>
                        {product.product.name} - Quantity: {product.quantity}
                      </li>
                      {index < order.orderItems.length - 1 && <hr className="my-2 border-gray-200" />}
                    </React.Fragment>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-end gap-4">
                {(order.status === "PENDING" || order.status === "PROCESSING") && (
                  <button
                    onClick={() => {
                      cancelItem(order.id);
                    }}
                    className="px-4 h-8 text-sm font-medium text-gray-700 bg-white border-2 border-gray-700 rounded-md hover:bg-gray-300">
                    Cancel Order
                  </button>
                )}
                {user.auth_type === "seller" && (
                  <button
                    onClick={() => {
                      changeStatus(order.id);
                    }}
                    className="px-4  h-8 text-sm font-medium text-white bg-black rounded-md hover:bg-teal-700 ">
                    Proceed status
                  </button>
                )}
                <button onClick={() => {}} className="px-4 h-8 text-sm font-medium text-white bg-black rounded-md hover:bg-teal-700 ">
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

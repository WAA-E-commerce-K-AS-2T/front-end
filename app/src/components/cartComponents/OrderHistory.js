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
    axios
      .get("http://localhost:8080/api/v1/orders", { headers: { authorization: `Bearer ${token}` } })
      .then((response) => {
        setOrders(response.data);
      })
      .catch(() => {
        toast.error("Error");
      });
  };

  const generatePDF = async (id) => {
    const products = orders[id]?.orderItems?.map((item) => {
      const product = {
        name: item?.product?.name,
        quantity: item?.quantity,
        amount: item?.product?.price,
      };
      return product;
    });
    const withVat = orders[id]?.amount + (orders[id]?.amount * 13) / 100;
    const data = {
      invoiceId: orders[id]?.id,
      invoiceDate: new Date(),
      name: user?.fullName,
      address: "Fairfield",
      city: "Fairfield",
      state: "Iowa",
      status: user?.email,
      products: products,
      amount: orders[id]?.amount,
      totalWithVat: withVat,
      payment: {
        name: orders[id]?.paymentMethod,
      },
    };
    try {
      const templateId = "f51c8894ffc2d0a45e5bbe137b24b367cdb119698255aeeea9dc2cb164abde37";
      const apiKey =
        "test_eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI5MTgyOTMxMzU3ODgwNzI3NjEiLCJhdWQiOiJjYXJib25lIiwiZXhwIjoyMzgxMTg0MjcyLCJkYXRhIjp7InR5cGUiOiJ0ZXN0In19.ALMIzeMC3xe50pRf_I-VgFUm1rChvwuQlBKVEs7GP-YTzd1g7cqb-2SQosJpkSLyaytcaNDM6dBnu6PlVnmweevNAOMt-FuL4Fj4zNKYg7CYsnm0SogZqTZjCZ57wZ1luhj68kgX-cJd9W3gWGFSBCsroD7Lf3bb_sF5mKem9tia8j8N";

      // Carbone.io API endpoint
      const url = `https://api.carbone.io/render/${templateId}`;

      // Headers for the API request
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };
      // Prepare the request body
      const requestBody = {
        data: data,
        convertTo: "pdf",
      };
      // Make the API request
      const response = await axios.post(url, requestBody, { headers });

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: "application/pdf" });

      if (response.data && response.data.success) {
        const renderId = response.data.data.renderId;
        const downloadUrl = `https://api.carbone.io/render/${renderId}`;

        // Make a GET request to download the generated PDF
        const pdfResponse = await axios.get(downloadUrl, {
          responseType: "arraybuffer",
        });

        // Create a Blob from the response data
        const blob = new Blob([pdfResponse.data], { type: "application/pdf" });

        // Create a link element and trigger a download
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "invoice.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("Error generating PDF:", response.data.error);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const cancelItem = (id) => {
    axios
      .put(`http://localhost:8080/api/v1/orders/${id}/cancel`, {}, { headers: { authorization: `Bearer ${token}` } })
      .then((response) => {
        toast.success("Successfully canceled!");
        fetchOrders();
      })
      .catch(() => {
        toast.error("You cannot cancel order after shipped!");
      });
  };
  const changeStatus = (id) => {
    axios
      .put(
        `http://localhost:8080/api/v1/orders/${id}/status`,
        {},
        {
          headers: { authorization: `Bearer ${token}` },
        },
      )
      .then((response) => {
        toast.success("Success proceeded!");
        fetchOrders();
      })
      .catch(() => {
        toast.error("You cannot proceed status!");
      });
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>

      {orders.map((order, index) => (
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
                <button onClick={() => generatePDF(index)} className="px-4 h-8 text-sm font-medium text-white bg-black rounded-md hover:bg-teal-700 ">
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

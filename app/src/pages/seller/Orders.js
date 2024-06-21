import { useEffect, useState } from "react";
import CustomButton from "../../components/controllers/CustomButton";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
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
    <div className="relative overflow-x-auto sm:rounded-lg mx-16 my-8">
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => (
            <tr key={item.name} className="odd:bg-white even:bg-gray-50 border-b">
              <td className="px-6 py-4">{item.username}</td>
              <td className="px-6 py-4">{item.quantity}</td>
              <td className="px-6 py-4 font-semibold text-teal-500">{item.productStatus}</td>
              <td className="px-6 py-4">
                <CustomButton text="Proceed status" handleClick={() => changeStatus(item.id)} />
              </td>
              <td className="px-6 py-4">
                <CustomButton text="Cancel order" handleClick={() => cancelItem(item.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Orders;

import { useEffect, useState } from "react";
import CustomButton from "../../components/controllers/CustomButton";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    axios
      .get("http://localhost:8080/api/v1/sellers/orders", { headers: { authorization: `Bearer ${token}` } })
      .then((response) => {
        setOrders(response.data);
      })
      .catch(() => {
        toast.error("Error");
      });
  };
  const cancelItem = (id) => {
    axios
      .put(`http://localhost:8080/api/v1/orders/${id}/cancel`, {}, { headers: { authorization: `Bearer ${token}` } })
      .then((response) => {
        fetchOrders();
        toast.success("Successfully canceled!");
      })
      .catch((e) => {
        toast.error("You cannot cancel order after shipped!");
      });
  };
  const changeStatus = (id) => {
    axios
      .put(`http://localhost:8080/api/v1/orders/${id}/status`, {}, { headers: { authorization: `Bearer ${token}` } })
      .then((response) => {
        fetchOrders();
        toast.success("Success proceeded!");
      })
      .catch(() => {
        toast.error("Error");
      });
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
              Order Id
            </th>

            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => (
            <tr key={item.name} className="odd:bg-white even:bg-gray-50 border-b">
              <td className="px-6 py-4">{item.id}</td>
              <td className="px-6 py-4">{item.orderItems[0].quantity}</td>
              <td className="px-6 py-4 font-semibold text-teal-500">{item.status}</td>
              <td className="px-6 py-4 font-semibold text-semibold">{item.amount}</td>
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

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../components/controllers/CustomButton";
import axios from "axios";

const Orders = () => {
  const [products, setProducts] = useState([]);

  const getOrderHistory = async () => {
    const token = localStorage.getItem("token");

    await axios
      .get("http://localhost:8080/api/v1/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleStatus = (id) => {};

  useEffect(() => {
    getOrderHistory();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="relative overflow-x-auto sm:rounded-lg mx-16 my-8">
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Color
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
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
          {products.map((item) => (
            <tr key={item.name} className="odd:bg-white even:bg-gray-50 border-b">
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">{item.color}</td>
              <td className="px-6 py-4">{item?.categoryIds || ""}</td>
              <td className="px-6 py-4">${item.price}</td>
              <td className="px-6 py-4">{item.quantity}</td>
              <td
                className={`px-6 py-4 font-semibold ${
                  item.productStatus === "shipped"
                    ? "text-teal-500"
                    : item.productStatus === "Rejected"
                    ? "text-red-500"
                    : item.productStatus === "In review"
                    ? "text-orange-500"
                    : ""
                }`}>
                {item.productStatus}
              </td>
              <td className="px-6 py-4">
                <Link to="" className="font-medium text-blue-600 mr-4 hover:underline">
                  <td className="px-6 py-4 flex gap-2">
                    <CustomButton text="Save" handleClick={() => handleStatus(item.id)} />
                  </td>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Orders;

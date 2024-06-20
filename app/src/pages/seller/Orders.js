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
  console.log(products);
  products?.forEach((element) => {
    console.log(element.amount, element.status);
    element.orderItems.forEach((orderItem) => {
      console.log(orderItem.product.name);
      console.log(orderItem.product.price);
      console.log(orderItem.quantity);
    });
  });

  useEffect(() => {
    getOrderHistory();
  }, []);

  const navigate = useNavigate();
  return (
    <div className='relative overflow-x-auto sm:rounded-lg mx-24 my-8'>
      <table className='w-full text-sm text-left rtl:text-right'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Product name
            </th>
            <th scope='col' className='px-6 py-3'>
              Color
            </th>
            <th scope='col' className='px-6 py-3'>
              Category
            </th>
            <th scope='col' className='px-6 py-3'>
              Price
            </th>
            <th scope='col' className='px-6 py-3'>
              Quantity
            </th>
            <th scope='col' className='px-6 py-3'>
              Status
            </th>

            <th scope='col' className='px-6 py-3'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr
              key={item.name}
              className='odd:bg-white even:bg-gray-50 border-b'
            >
              <th
                scope='row'
                className='px-6 py-4 font-medium  whitespace-nowrap'
              >
                <Link to='/:id'> item?.</Link>
              </th>
              <td className='px-6 py-4'>Silver</td>
              <td className='px-6 py-4'>Laptop</td>
              <td className='px-6 py-4'>$2999</td>
              <td className='px-6 py-4'>10</td>
              <td className='px-6 py-4 text-teal-500'>Shipped</td>
              <td className='px-6 py-4'>
                <Link
                  to=''
                  className='font-medium text-blue-600 mr-4 hover:underline'
                >
                  Edit
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

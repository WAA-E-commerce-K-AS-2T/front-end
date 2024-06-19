import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../components/controllers/customButton";

const Products = () => {
  const [products, setProducts] = useState([
    { name: "Apple MacBook Pro 17", category: "color", price: 1000 },
  ]);
  const navigate = useNavigate();
  return (
    <div className="relative overflow-x-auto sm:rounded-lg mx-24 my-8">
      <div className="text-right mb-4">
        <CustomButton
          text="+ Add Product"
          handleClick={() => {
            navigate("/seller/addProduct");
          }}
        />
      </div>
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
            <tr
              key={item.name}
              className="odd:bg-white even:bg-gray-50 border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium  whitespace-nowrap">
                <Link to="/:id"> Apple MacBook Pro 17"</Link>
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">10</td>
              <td className="px-6 py-4 text-teal-500">Approved</td>
              <td className="px-6 py-4">
                <Link
                  to=""
                  className="font-medium text-blue-600 mr-4 hover:underline">
                  Edit
                </Link>
                <Link
                  to=""
                  className="font-medium text-blue-600  hover:underline">
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Products;

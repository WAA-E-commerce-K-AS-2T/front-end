import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import axios from "axios";
import toast from "react-hot-toast";
import { setLoading } from "../../redux/actions";
import CustomButton from "../../components/controllers/CustomButton";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([
    { id: 1, name: "Apple MacBook Pro 17", category: "electronics", price: 1000, inStock: 0, size: "", material: "" },
  ]);
  const [categories, setCategories] = useState([]);

  const fetchData = () => {
    dispatch(setLoading(true));
    try {
      axios.get("http://localhost:8080/api/v1/products?page=0&size=10").then((response) => {
        dispatch(setLoading(false));
        console.log("content", response.data.content);
        setProducts(response.data.content);
      });
    } catch (e) {
      dispatch(setLoading(false));
      toast.error("Error!");
    }
  };

  const handleApprove = (value) => {
    console.log(value);
  };

  const getAllCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/category");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    getAllCategory();
  }, []);

  return (
    <div className="relative overflow-x-auto sm:rounded-lg mx-24 my-8">
      <div className="text-right mb-4"></div>
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
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
              Color
            </th>
            <th scope="col" className="px-6 py-3">
              Size
            </th>
            <th scope="col" className="px-6 py-3">
              Material
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
              <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap">
                {item.name}
              </th>
              <td className="px-6 py-4">{categories.filter((i) => i.id === item.category)[0].name || ""}</td>
              <td className="px-6 py-4">{item.price}</td>
              <td className="px-6 py-4">{item.inStock}</td>
              <td className="px-6 py-4">{item.color}</td>
              <td className="px-6 py-4">{item.size}</td>
              <td className="px-6 py-4">{item.material}</td>
              <td className="px-6 py-4 text-teal-500 font-semibold">Approved</td>
              <td className="px-6 py-4 flex gap-2">
                <CustomButton text="Reject" handleClick={handleApprove(false)} />
                <CustomButton text="Approve" handleClick={handleApprove(true)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AdminProducts;

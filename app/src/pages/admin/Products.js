import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import axios from "axios";
import toast from "react-hot-toast";
import { setLoading } from "../../redux/actions";
import CustomButton from "../../components/controllers/CustomButton";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const status_types = ["APPROVED", "REJECTED"];
  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState(status_types[0]);

  const fetchData = () => {
    dispatch(setLoading(true));
    try {
      axios.get("http://localhost:8080/api/v1/products?page=0&size=10").then((response) => {
        dispatch(setLoading(false));
        setProducts(response.data.content);
      });
    } catch (e) {
      dispatch(setLoading(false));
      toast.error("Error!");
    }
  };

  const handleApprove = (productId) => {
    axios
      .put(`http://localhost:8080/api/v1/products/${productId}/set-status`, { status }, { headers: { authorization: `Bearer ${token}` } })
      .then((response) => {
        toast.success("Product status changed!");
        fetchData();
      });
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

  useEffect(() => {}, [products]);

  return (
    <div className="relative overflow-x-auto sm:rounded-lg mx-16 my-8">
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
            <th scope="col" className="px-6 py-3"></th>
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
              <td className="px-6 py-4">{categories.filter((i) => i.id === item.category)[0]?.name || ""}</td>
              <td className="px-6 py-4">{item.price}</td>
              <td className="px-6 py-4">{item.inStock}</td>
              <td className="px-6 py-4">{item.color}</td>
              <td className="px-6 py-4">{item.productSize}</td>
              <td className="px-6 py-4">{item.material}</td>
              <td
                className={`px-6 py-4 font-semibold ${
                  item.productStatus === "Approved"
                    ? "text-teal-500"
                    : item.productStatus === "Rejected"
                    ? "text-red-500"
                    : item.productStatus === "In Review"
                    ? "text-orange-500"
                    : ""
                }`}>
                {item.productStatus}
              </td>
              <td>
                <select
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}>
                  {status_types.map((i) => (
                    <option>{i}</option>
                  ))}
                </select>
              </td>
              <td className="px-6 py-4 flex gap-2">
                <CustomButton text="Save" handleClick={() => handleApprove(item.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AdminProducts;

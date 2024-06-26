import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../../components/controllers/CustomButton";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/actions";
import axios from "axios";
import toast from "react-hot-toast";

const Products = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const fetchData = () => {
    dispatch(setLoading(true));
    try {
      axios
        .get("http://localhost:8080/api/v1/sellers/products", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          dispatch(setLoading(false));
          setProducts(response.data);
        });
    } catch (e) {
      dispatch(setLoading(false));
      toast.error("Error!");
    }
  };
  const deleteItem = (id) => {
    dispatch(setLoading(true));
    axios.delete("http://localhost:8080/api/v1/products/" + id, { headers: { authorization: `Bearer ${token}` } }).then((response) => {
      dispatch(setLoading(false));
      toast.success("Succesfully deleted!");
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
  return (
    <div className="relative overflow-x-auto sm:rounded-lg mx-16 my-8">
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
              <td className="px-6 py-4">
                {categories.filter((i) => item.categoryIds.includes(i.id)).length > 0
                  ? categories.filter((i) => item.categoryIds.includes(i.id))[0].name
                  : ""}
              </td>
              <td className="px-6 py-4">{item.price}</td>
              <td className="px-6 py-4">{item.inStock !== 0 ? item.inStock : <span className="text-red-500 font-semibold">Out of stock</span>}</td>
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
              <td className="px-6 py-4">
                <Link to={`/seller/editProduct/${item.id}`} className="font-medium text-blue-600 mr-4 hover:underline">
                  Edit
                </Link>
                <button className="font-medium text-blue-600  hover:underline" onClick={() => deleteItem(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Products;

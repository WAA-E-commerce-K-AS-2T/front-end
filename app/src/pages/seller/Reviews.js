import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../components/controllers/CustomButton";

const Reviews = () => {
  const [purchases, setPurchases] = useState([{ product: "", username: "", rating: "", reviews: "" }]);
  const navigate = useNavigate();
  const userType = "admin";
  return (
    <div className="relative overflow-x-auto sm:rounded-lg mx-24 my-8">
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Rating
            </th>
            <th scope="col" className="px-6 py-3">
              Review
            </th>
            {userType === "admin" && (
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {purchases.map((item) => (
            <tr key={item.name} className="odd:bg-white even:bg-gray-50 border-b">
              <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap">
                <Link to="/:id"> Apple MacBook Pro 17"</Link>
              </th>
              <td className="px-6 py-4">Ariuka</td>
              <td className="px-6 py-4">5</td>
              <td className="px-6 py-4">Very Good</td>
              {userType === "admin" && (
                <td className="px-6 py-4">
                  <button to="" className="font-medium text-blue-600 mr-4 hover:underline">
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Reviews;

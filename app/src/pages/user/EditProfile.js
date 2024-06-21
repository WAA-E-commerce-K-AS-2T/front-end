import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/controllers/CustomButton";
import { setAddress, setLoading } from "../../redux/actions";
import { useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const EditProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const formRef = useRef();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    const formData = formRef.current;

    const data = {
      fullname: formData["fullName"].value,
      address: {
        id: "",
        address1: formData["address1"].value,
        address2: "asdfasdf asdfasd",
        address3: "",
        address4: "",
        city: formData["city"].value,
        zipcode: formData["zipcode"].value,
        pincode: formData["pincode"].value,
        state: formData["state"].value,
      },
    };

    axios
      .put("http://localhost:8080/api/v1/profile", data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(setAddress(response.data));
        axios
          .get("http://localhost:8080/api/v1/buyers/address", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            localStorage.setItem("address", JSON.stringify(res.data));
          })

          .catch((err) => console.log(err));
        toast.success("Profile changed!");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  useEffect(() => {
    formRef.current.fullName.value = user.fullName;
  }, [user]);

  return (
    <div className="mx-24 my-8">
      <h3 className="text-2xl font-bold">Edit profile</h3>
      <form className="mt-4 text-left  grid grid-cols-2 gap-8" onSubmit={handleSubmit} ref={formRef}>
        <div className="col-span-1">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Enter an email"
              value={user.email}
              disabled
            />
          </div>
          <div className="mt-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter username"
              name="fullName"
              required
            />
          </div>
          <div className="mt-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              User type
            </label>
            <div className="flex gap-4 items-center">
              <input
                type="radio"
                value="SELLER"
                label="Seller"
                name="authType"
                checked={user.auth_type === "seller"}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-teal-600 focus:ring-2"
                disabled
              />
              <label for="seller">Seller</label>
              <input
                type="radio"
                value="BUYER"
                name="authType"
                checked={user.auth_type === "seller"}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-teal-600 focus:ring-2"
                disabled
              />
              <label htmlFor="buyer">Buyer</label>
            </div>
          </div>

          <div className="flex items-center justify-start mt-6">
            <CustomButton text="Save" type="submit"></CustomButton>
          </div>
        </div>
        <div className="col-span-1">
          <div className="mt-4">
            <label htmlFor="address1">Address Line 1</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="address1"
              type="text"
              placeholder="Address 1"
              required
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <label htmlFor="city">City</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="city"
                name="city"
                type="text"
                placeholder="City"
                required
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="state">State</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="state"
                name="state"
                type="text"
                placeholder="state"
                required
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <label htmlFor="address4">Zip code</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="zipcode"
                name="zipcode"
                type="text"
                placeholder="Zip code"
                required
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="pincode">Pin code</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pincode"
                name="pincode"
                type="text"
                placeholder="Pin code"
                required
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;

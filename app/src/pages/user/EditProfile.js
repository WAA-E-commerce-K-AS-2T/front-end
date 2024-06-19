import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CustomButton from "../../components/controllers/CustomButton";
import { Link } from "react-router-dom";
import { setLoading } from "../../redux/actions";
import { useEffect, useRef, useState } from "react";

const EditProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authType, setAuthType] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    const data = {
      email: email,
      fullName: username,
      password: password,
      authtype: authType,
    };
  };
  useEffect(() => {
    // setEmail(user.email);
    // setUsername(user.fullName);
    // setPassword(user.email);
    // setAuthType(user.email);
    // setAddress(user.email);
  });

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mt-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                checked={authType === "SELLER"}
                onChange={(e) => setAuthType(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-teal-600 focus:ring-2"
              />
              <label for="seller">Seller</label>
              <input
                type="radio"
                value="BUYER"
                name="authType"
                checked={authType === "BUYER"}
                onChange={(e) => setAuthType(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-teal-600 focus:ring-2"
              />
              <label for="buyer">Buyer</label>
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
          <div className="mt-4">
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
          <div className="mt-4">
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
          <div className="mt-4">
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
      </form>
    </div>
  );
};

export default EditProfile;

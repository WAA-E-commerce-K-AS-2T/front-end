import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/controllers/CustomButton";
import { useNavigate } from "react-router";
import { setUser } from "../../redux/actions";
import ProfileImg from "../../assets/images/profile.gif";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [address, setAddress] = useState(null);
  const getAddress = () => {
    axios
      .get("http://localhost:8080/api/v1/buyers/address", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAddress(response.data);
        console.log(response.data);
      })
      .catch(() => {
        toast.error("error");
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setUser(null));
  };
  useEffect(() => {
    if (user.auth_type === "buyer") getAddress();
  }, [user]);
  return (
    <div className="flex items-start  justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 bg-white mt-16 rounded-lg shadow-md text-left w-full max-w-md z-20">
        <div className="rounded-full border-2 border-black h-24 w-24 mb-8 mx-auto relative z-10">
          <img src={ProfileImg} alt="" className="w-24 absolute -bottom-[9px]" />
        </div>
        <p className="text-xl font-semibold">
          Username: <span className="font-light">{user.fullName}</span>
        </p>
        <p className="text-xl font-semibold mt-2">
          Email: <span className="font-light">{user.email}</span>
        </p>
        <p className="text-xl font-semibold mt-2">
          User type: <span className="font-light">{user?.auth_type}</span>
        </p>
        {user.auth_type === "buyer" && (
          <>
            <p className="text-xl font-semibold mt-2">
              Address: <span className="font-light"> {address?.address1 || ""}</span>
            </p>
            <p className="text-xl font-semibold mt-2">
              State: <span className="font-light"> {address?.state || ""}</span>
            </p>
            <p className="text-xl font-semibold mt-2">
              City: <span className="font-light"> {address?.city || ""}</span>
            </p>
            <p className="text-xl font-semibold mt-2">
              Zip code: <span className="font-light"> {address?.zipcode || ""}</span>
            </p>
            <p className="text-xl font-semibold mt-2">
              Pin code: <span className="font-light"> {address?.pincode || ""}</span>
            </p>
          </>
        )}
        <div className="flex gap-3 mt-8 w-full justify-center">
          {user.auth_type === "buyer" && (
            <CustomButton
              text="Edit profile"
              handleClick={() => {
                navigate("/user/editProfile");
              }}
            />
          )}
          <CustomButton text="Logout" handleClick={logout} />
        </div>
      </div>
    </div>
  );
};
export default Profile;

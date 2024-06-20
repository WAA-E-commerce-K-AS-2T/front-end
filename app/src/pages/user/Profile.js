import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/controllers/CustomButton";
import { useNavigate } from "react-router";
import { setUser } from "../../redux/actions";
import ProfileImg from "../../assets/images/profile.gif";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setUser(null));
  };
  return (
    <div className="mx-auto w-80 my-8 text-center border-[1px] border-black-800 shadow-sm border-solid p-8 ">
      <img src={ProfileImg} alt="" className="w-24 mx-auto mb-8" />
      <p className="text-xl font-semibold">
        Username: <span className="font-light">{user.fullName}</span>
      </p>
      <p className="text-xl font-semibold mt-2">
        Email: <span className="font-light">{user.email}</span>
      </p>
      <p className="text-xl font-semibold mt-2">
        User type: <span className="font-light">{user.auth_type}</span>
      </p>
      <p className="text-xl font-semibold mt-2">
        Address: <span className="font-light"> {user.address1}</span>
      </p>
      <div className="flex gap-3 mt-4">
        <CustomButton
          text="Edit profile"
          handleClick={() => {
            navigate("/user/editProfile");
          }}
        />
        <CustomButton text="Logout" handleClick={logout} />
      </div>
    </div>
  );
};
export default Profile;

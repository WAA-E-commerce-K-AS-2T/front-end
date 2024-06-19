import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/controllers/CustomButton";
import { useNavigate } from "react-router";
import { setUser } from "../../redux/actions";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
  };
  return (
    <div className="mx-24 my-8 text-left">
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

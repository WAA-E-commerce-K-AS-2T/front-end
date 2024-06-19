import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children }) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  console.log("children");

  return children;
};

export default ProtectedRoutes;

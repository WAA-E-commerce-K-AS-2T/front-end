import { useDispatch } from "react-redux";
import "./App.css";
import PageRoutes from "./components/PageRoutes";
import Loader from "./components/controllers/Loader";
import { useEffect } from "react";
import { setUser } from "./redux/actions";
import { decodeToken } from "./utils/token";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = decodeToken(token);
      console.log("user", user);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Loader />
      <Toaster position="top-center" reverseOrder={false} />
      <PageRoutes />
    </div>
  );
}

export default App;

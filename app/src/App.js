import { useDispatch } from "react-redux";
import "./App.css";
import PageRoutes from "./components/PageRoutes";
import Loader from "./components/controllers/Loader";
import { useEffect } from "react";
import { setUser } from "./redux/actions";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
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

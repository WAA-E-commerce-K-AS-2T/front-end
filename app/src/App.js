import { useSelector } from "react-redux";
import "./App.css";
import PageRoutes from "./components/PageRoutes";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";

function App() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  return (
    <div className="App">
      <PageRoutes />
    </div>
  );
}

export default App;

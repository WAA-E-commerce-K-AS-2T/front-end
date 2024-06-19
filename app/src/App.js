import "./App.css";
import PageRoutes from "./components/PageRoutes";
import Loader from "./components/controllers/Loader";

function App() {
  return (
    <div className="App">
      <Loader />
      <PageRoutes />
    </div>
  );
}

export default App;

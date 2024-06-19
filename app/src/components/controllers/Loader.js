import { Audio } from "react-loader-spinner";
import { useSelector } from "react-redux";
const Loader = () => {
  const loading = useSelector((state) => state.loading.isLoading);
  console.log("loading", loading);
  if (!loading) {
    return null;
  }
  return (
    <div className="fixed w-screen h-screen bg-white bg-opacity-80 z-50 flex items-center justify-center" role="status">
      <Audio height="80" width="80" radius="9" color="teal" ariaLabel="loading" wrapperStyle wrapperClass />
    </div>
  );
};
export default Loader;

import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const Layout = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      {user && user.auth_type === "buyer" ? (
        <div>
          {" "}
          <Header />
          <Outlet />
          <Footer />
        </div>
      ) : (
        <div className="w-full">
          <Header />
          <div className="flex">
            <Sidebar />
            <div className="w-full">
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};
export default Layout;

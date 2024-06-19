import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = () => {
  const userType = "seller";
  return (
    <>
      {userType === "buyer" ? (
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

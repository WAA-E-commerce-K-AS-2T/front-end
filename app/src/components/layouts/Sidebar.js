import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div
      id="default-sidebar"
      className="top-0 left-0 z-40 w-64 h-screen border-black border-solid border-r-[1px]  transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <li>
            <Link to="/seller/products" className="flex items-center p-2 rounded-lg hover:bg-gray-100  group">
              <svg
                className="flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20">
                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
              </svg>
              <span className="ml-6">Products</span>
            </Link>
          </li>
          {user.auth_type === "seller" && (
            <li>
              <Link
                to="/seller/order"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${window.location.pathname === "/seller/order"}`}>
                <svg
                  className="flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />{" "}
                </svg>
                <span className="ml-6">Order</span>
              </Link>
            </li>
          )}
          <li>
            <Link
              to={user.auth_type === "seller" ? "/seller/review" : "/admin/review"}
              className="flex items-center p-2 rounded-lg hover:bg-gray-100  group">
              <svg
                className="flex-shrink-0 w-5 h-5  transition duration-75 group-hover:text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="ml-6">Review</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

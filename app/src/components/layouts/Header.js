import { useState } from "react";
import { Link } from "react-router-dom";
import cart from "./../../assets/images/cart.gif";
import logo from "./../../assets/images/logo_big.png";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const [categories, setCategories] = useState([
    { name: "Electronics", sub: [{ name: "TV" }] },
    { name: "Toys", sub: [{ name: "Ball" }] },
  ]);
  const [subOpen, setSubOpen] = useState(false);
  const userType = "seller";

  const fetchCategories = () => {};

  const handleOpen = () => {
    setSubOpen(true);
  };

  return (
    <div className="header">
      <div className="top">
        <Link to="/">
          <img className="h-10" alt="logo" src={logo} />
        </Link>
        <div className="flex gap-2 items-between shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          {user ? (
            <Link className="cursor-pointer hover:underline" to="/user/profile">
              {user.sub}
            </Link>
          ) : (
            <Link className="cursor-pointer hover:underline" to="/login">
              Sign in
            </Link>
          )}
        </div>
      </div>
      {userType === "buyer" && (
        <div className="flex justify-between h-18 items-center px-8 py-4 font-medium border-b-2 border-solid border-black">
          <div className="flex gap-12 items-center relative">
            {categories.map((i) => (
              <div className="relative">
                <Link className="hover:underline text-black cursor-pointer" to="">
                  {i.name}
                  <button className="border-none" onClick={() => handleOpen()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-3 ml-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                </Link>
                <div className={`absolute top-4 ${subOpen ? "display" : "none"} shadow-sm p-6`}>
                  {i.sub &&
                    i.sub.map((j) => {
                      <Link>{j.name}</Link>;
                    })}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 items-center">
            <div className="relative">
              <button className="border-none absolute top-2 left-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
              <input
                placeholder="Search items ..."
                className={`focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500 shadow appearance-none border rounded w-48 md:w-72 py-2 px-3 pl-12 text-gray-700 leading-tight`}
              />
            </div>
            <button className="relative cursor-pointer">
              <img src={cart} alt="cart" className="h-9 w-9" />
              <span className="absolute bg-yellow-500 rounded-full h-4 w-4 top-0 right-0 text-xs flex items-center justify-center text-white">5</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

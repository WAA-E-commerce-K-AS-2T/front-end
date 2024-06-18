import { useState } from "react";
import { Link } from "react-router-dom";
import cart from "./../../assets/images/cart.gif";
import logo from "./../../assets/images/logo.png";

const Header = () => {
  const [categories, setCategories] = useState([
    { name: "Electronics", sub: [{ name: "TV" }] },
    { name: "Toys", sub: [{ name: "Ball" }] },
  ]);
  const [loggedUser, setLoggedUser] = useState("Sign in");
  const [subOpen, setSubOpen] = useState(false);
  const fetchCategories = () => {};
  const handleOpen = () => {
    setSubOpen(true);
  };
  return (
    <div className="sticky top-0 w-full ">
      <div className="h-16 border-b-2 border-solid border-black flex gap-8 p-4 items-center justify-between shrink-0">
        <div className="w-24">
          <img className="w-12 h-12" alt="logo" src={logo} />
        </div>

        <div className="flex gap-2 items-between shrink-0 px-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="size-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <Link className="cursor-pointer hover:underline" to="/login">
            {loggedUser}
          </Link>
        </div>
      </div>
      <div className="flex justify-between h-16 items-center px-8 py-4 font-semibold border-b-2 border-solid border-black">
        <div className="flex gap-12 items-center relative">
          {categories.map((i) => (
            <div className="relative">
              <Link className="hover:underline text-black cursor-pointer" to="">
                {i.name}
                <button className="border-none" onClick={() => handleOpen()}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="size-3 ml-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="size-6">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
            <input
              placeholder="Search items ..."
              className={`focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500 shadow appearance-none border rounded w-60 py-2 px-3 pl-12 text-gray-700 leading-tight`}
            />
          </div>
          <button className="relative cursor-pointer">
            <img src={cart} alt="cart" className="h-8 w-8" />
            <span className="absolute bg-yellow-500 rounded-full h-4 w-4 top-0 right-0 text-xs flex items-center justify-center text-white">5</span>
            <span className="text-[10px]">$ 50.6</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

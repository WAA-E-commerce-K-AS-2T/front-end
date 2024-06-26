import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cart from "./../../assets/images/cart.gif";
import list from "./../../assets/images/list_icon.gif";
import logo from "./../../assets/images/logo_big.png";
import { useSelector } from "react-redux";
import axios from "axios";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subOpen, setSubOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleOpen = () => {
    setSubOpen(true);
  };

  const getAllCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/category");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // navigate("/search");
      navigate("/search?name=" + inputValue);
    }
  };

  const handleChangeInput = (event) => {
    setInputValue(event.target.value);
  };

  const onClickCart = () => {
    navigate("/cart");
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  const onClickHistory = () => {
    navigate("/order");

    if (user.auth_type === "seller") navigate("/user/order");
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
              {user.fullName}
            </Link>
          ) : (
            <Link className="cursor-pointer hover:underline" to="/login">
              Sign in
            </Link>
          )}
        </div>
      </div>
      {!user || user.auth_type === "buyer" ? (
        <div className="flex justify-between h-18 items-center px-8 py-4 font-medium border-b-2 border-solid border-black">
          <div className="flex gap-12 items-center relative">
            {categories.map((i) => (
              <div className="relative" key={i.id}>
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
                onChange={handleChangeInput}
                onKeyDown={handleKeyDown}
                className={`focus:ring-teal-500 focus:border-teal-500 focus:outline-teal-500 shadow appearance-none border rounded w-48 md:w-72 py-2 px-3 pl-12 text-gray-700 leading-tight`}
              />
            </div>
            <button className="relative cursor-pointer" onClick={onClickCart}>
              <img src={cart} alt="cart" className="h-9 w-9" />
            </button>
            <button className="relative cursor-pointer" onClick={onClickHistory}>
              <img src={list} alt="list" className="h-8 w-8" />
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;

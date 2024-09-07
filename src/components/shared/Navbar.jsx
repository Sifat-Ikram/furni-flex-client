import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { TbShoppingBag } from "react-icons/tb";
import account from "../../assets/account.png";
import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useCart from "../hooks/useCart";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart, cartRefetch] = useCart();

  useEffect(() => {
    cartRefetch();
  }, [cartRefetch]);

  const navLinks = (
    <>
      <li className="text-lg font-semibold py-2 flex justify-center items-center">
        <Link to={"/"}>Home</Link>
      </li>
      <li className="text-lg font-semibold py-2 flex justify-center items-center">
        <Link to={`/product/productsItem/all`}>Products</Link>
      </li>
      <li className="text-lg font-semibold py-2 flex justify-center items-center">
        <Link to={"/categories"}>Categories</Link>
      </li>
      <li className="text-lg font-semibold py-2 flex justify-center items-center">
        <Link to={"/custom"}>Custom</Link>
      </li>
      <li className="text-lg font-semibold py-2 flex justify-center items-center">
        <Link to={"/blog"}>Blog</Link>
      </li>
    </>
  );

  const handleLogOut = async () => {
    try {
      const res = await logOut();
      console.log(res.user);
      cartRefetch();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="border-b-2 border-solid w-full">
      <div className="navbar bg-base-100 md:w-5/6 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">
            <img src={logo} className="" />
            <h1 className="text-xl font-bold">
              Furni<span className="text-[#1E99F5]">Flex</span>
            </h1>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-3 px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end gap-5">
          <Link to="/cart" className="relative">
            <TbShoppingBag className="text-3xl" />
            <span className="absolute -right-2 -bottom-2 text-black text-xs font-semibold rounded-full w-5 h-5 flex justify-center items-center">
              {cart.length || 0}
            </span>
          </Link>
          <div className="dropdown dropdown-end relative">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <img src={account} />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content absolute w-48 flex flex-col justify-center bg-white items-center space-y-2 p-3 shadow-lg rounded-md"
            >
              <div className="text-center my-2">
                <h1 className="text-xl font-bold">{user?.displayName}</h1>
                <h1 className="text-base font-semibold">{user?.email}</h1>
              </div>
              {user ? (
                <button
                  onClick={() => handleLogOut()}
                  className="w-full hover:bg-base-200 py-2 rounded-md text-center"
                >
                  Logout
                </button>
              ) : (
                <>
                  <li className="w-full hover:bg-base-200 py-2 rounded-md text-center">
                    <Link to={"/login"}>Login</Link>
                  </li>
                  <li className="w-full hover:bg-base-200 py-2 rounded-md text-center">
                    <Link to={"/signUp"}>Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { TbShoppingBag } from "react-icons/tb";
import account from "../../assets/account.png";

const Navbar = () => {
  const navLinks = (
    <>
      <li className="text-lg font-semibold py-2">
        <Link to={"/"}>Home</Link>
      </li>
      <li className="text-lg font-semibold py-2">
        <Link to={"/products"}>Products</Link>
      </li>
      <li className="text-lg font-semibold py-2">
        <Link to={"/categories"}>Categories</Link>
      </li>
      <li className="text-lg font-semibold py-2">
        <Link to={"/custom"}>Custom</Link>
      </li>
      <li className="text-lg font-semibold py-2">
        <Link to={"/blog"}>Blog</Link>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
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
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end gap-5">
          <TbShoppingBag className="text-3xl" />
          <div className="dropdown dropdown-end relative">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <img src={account} />
            </div>
            <ul tabIndex={0} className="dropdown-content absolute w-40 flex flex-col justify-center items-center space-y-2 p-3 shadow-lg rounded-md">
              <li className="w-full hover:bg-base-200 py-2 rounded-md text-center">
                <Link to={"/login"}>Login</Link>
              </li>
              <li className="w-full hover:bg-base-200 py-2 rounded-md text-center">
                <Link to={"/signUp"}>Sign Up</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

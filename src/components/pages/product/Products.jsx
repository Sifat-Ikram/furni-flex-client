import { NavLink, Outlet } from "react-router-dom";
import useProduct from "../../hooks/useProduct";

const Products = () => {
  const [products] = useProduct();

  if (!products) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="mt-16 w-4/5 mx-auto flex justify-center gap-4">
      <div className="w-60 min-h-screen p-5 border-solid border-r-[1px]">
        {/* "All" NavLink */}
        <div className="py-3 border-b-[1px] border-solid">
          <NavLink
            to="/product/productsItem/all"
            className={({ isActive }) =>
              isActive
                ? "bg-black text-white py-2 pl-4 pr-36 rounded-md text-xl font-semibold"
                : "py-2 pl-4 pr-36 rounded-md text-xl font-semibold hover:bg-black hover:text-white"
            }
          >
            All
          </NavLink>
        </div>

        {/* Dynamically generated product links */}
        {products?.slice(0, 3).map((productItem) => (
          <div
            key={productItem._id}
            className="py-3 border-b-[1px] border-solid"
          >
            <NavLink
              to={`/product/productsItem/${productItem.id}`}
              className={({ isActive }) =>
                isActive
                  ? "bg-black text-white py-2 pl-4 pr-12 rounded-md text-xl font-semibold"
                  : "py-2 pl-4 pr-12 rounded-md text-xl font-semibold hover:bg-black hover:text-white"
              }
            >
              {productItem?.category}
            </NavLink>
          </div>
        ))}
      </div>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Products;

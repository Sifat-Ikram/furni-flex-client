import { useNavigate, useParams } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import { TbShoppingBag } from "react-icons/tb";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const ProductItems = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [products] = useProduct();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const productsPerPage = 6; // Set the number of products per page

  // Show all products if id === "all"
  const selectedProducts =
    id === "all" ? products : products?.filter((item) => item.id == id);

  if (!selectedProducts || selectedProducts.length === 0) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  // Calculate total pages
  const totalPages = Math.ceil(selectedProducts.length / productsPerPage);

  // Get the current products based on pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = selectedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleAddToCart = (item) => {
    if (user) {
      const cartItem = {
        username: user.displayName,
        email: user.email,
        details: item.text,
        name: item.title,
        category: item.category,
        image: item.image,
        price: parseFloat(item.newPrice),
      };

      axiosPublic.post("/cart", cartItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire("This item is added to the cart");
        }
      });
    } else {
      Swal.fire({
        title: "Oops!!! You aren't signed in.",
        text: "To add this item to the cart, you have to sign in first.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sign in",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: location.pathname });
        }
      });
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {currentProducts?.map((item) => (
          <div key={item._id}>
            <div className="flex flex-col bg-base-100 w-[277px] h-[484px] rounded-xl shadow-xl border-solid border-[1px]">
              <figure className="pt-5 px-5">
                <img
                  src={item?.image}
                  alt={item?.title}
                  className="rounded-xl h-[200px] w-full"
                />
              </figure>
              <div className="flex flex-col p-4 mt-3 space-y-2">
                <h2 className="card-title">{item?.title}</h2>
                <div className="flex items-center gap-3">
                  <h1 className="text-lg font-bold">${item?.newPrice}</h1>
                  <h1 className="text-lg font-semibold text-[#ABABAB] line-through">
                    ${item?.prevPrice}
                  </h1>
                  <h1 className="text-red-700 text-lg font-semibold">
                    {item?.discount} OFF
                  </h1>
                </div>
                <p>{item?.text}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="btn bg-black hover:bg-black text-white text-base font-semibold flex justify-center items-center gap-2 w-full"
                >
                  <TbShoppingBag />
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-10">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`btn mx-1 ${
              currentPage === i + 1 ? "btn bg-black hover:bg-black text-white" : "btn-outline"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductItems;

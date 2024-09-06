import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useCart from "../../hooks/useCart";

const CartPage = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [cart, refetch] = useCart();
  const [amounts, setAmounts] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initialAmounts = {};
    cart.forEach((item) => {
      initialAmounts[item.name] = 1;
    });
    setAmounts(initialAmounts);
  }, [cart]);

  const incrementQuantity = (itemId) => {
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [itemId]: (prevAmounts[itemId] || 0) + 1,
    }));
  };

  const decrementQuantity = (itemId) => {
    if (amounts[itemId] > 0) {
      setAmounts((prevAmounts) => ({
        ...prevAmounts,
        [itemId]: (prevAmounts[itemId] || 0) - 1,
      }));
    }
  };

  const calculateTotalCost = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * (amounts[item.name] || 0);
    });
    return total;
  };

  const handleOrderFinal = () => {
    const orderInfo = {
      userName: user.email,
      cart: cart,
      totalCost: calculateTotalCost(),
      amounts: amounts,
    };

    axiosPublic.post("/checkout", orderInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your order placed!!!",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate(location?.state ? location.state : "/");
      }
    });
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure you want to delete this item?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/cart/${item._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Item Deleted!",
                text: "This item has been deleted.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((error) => {
            console.log(error.message);
            Swal.fire({
              title: "Error",
              text: "An error occurred while deleting the item.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="flex my-20">
      <div className="w-full">
        <div className="w-11/12 mx-auto mt-10">
          <h1 className="text-2xl font-bold mb-5">An overview of your order</h1>
          <div className="flex gap-12">
            <div className="w-4/6 border-t-2">
              {cart?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center bg-base-200 p-5 border-b-2  rounded-md"
                >
                  <div className="flex justify-center items-center border-[1px] border-solid p-1">
                    <button
                      onClick={() => decrementQuantity(item.name)}
                      className="font-bold"
                    >
                      -
                    </button>
                    <h1 className="mx-1">{amounts[item.name]}</h1>
                    <button
                      onClick={() => incrementQuantity(item.name)}
                      className="font-bold"
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <img
                      src={item.image}
                      className="h-24 w-24 rounded-md py-2 bg-white"
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <div className="flex justify-between">
                      <p className="font-bold">Name: {item.name}</p>
                      <button
                        onClick={() => handleDelete(item)}
                        className="text-sm font-semibold"
                      >
                        X
                      </button>
                    </div>
                    <p className="font-bold mt-2 flex justify-end">
                      Total: ${item.price * (amounts[item.name] || 0)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-5">Order details</h2>
              <div className="bg-gray-100 h-fit py-3 px-5 rounded-lg">
                <div className="border-b-2 pb-3 border-solid space-y-2">
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl font-normal">Subtotal :</h1>
                    <p className="text-xl font-normal">
                      ${calculateTotalCost()}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl font-normal">Shipping</h1>
                    <p className="text-xl font-normal">Free</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl font-normal">Estimated Tax</h1>
                    <p className="text-xl font-normal">$-</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-between">
                  <p className="text-xl font-normal">Total Amount: </p>
                  <p className="text-xl font-bold text-black">
                    ${calculateTotalCost()}
                  </p>
                </div>
              </div>
              <button
                onClick={handleOrderFinal}
                className="w-full p-3 bg-black text-white text-lg font-medium mt-5"
              >
                Go to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

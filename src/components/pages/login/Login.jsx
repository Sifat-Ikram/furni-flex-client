import { useLocation, useNavigate } from "react-router-dom";
import img from "../../../assets/chair.png";
import logo from "../../../assets/logo.png";
import { useContext, useState } from "react";
import { auth, AuthContext } from "../../provider/AuthProvider";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { sendPasswordResetEmail } from "firebase/auth";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logIn, googleRegister } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, watch } = useForm();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const termsAgreed = watch("terms", false);

  const handleForgotPassword = async () => {
    if (!email) {
      Swal.fire("Please enter your email address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire("Password reset email sent! Please check your inbox.");
    } catch (err) {
      console.log(err.message);
      Swal.fire("Failed to send password reset email. Try again.");
    }
  };

  const handleGoogleRegister = () => {
    googleRegister()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err.message));
  };

  const onSubmit = async (data) => {
    logIn(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        console.error(err.message);
        setError(err.message);
      });
    setError("");
  };

  return (
    <div className="w-full flex max-md:flex-col-reverse justify-center">
      <div className="md:w-1/2 flex justify-center items-center lg:px-[100px] md:px-[50px]">
        <div className="bg-base-200 rounded-md flex flex-col justify-center my-[50px] md:my-[100px] lg:my-[150px] px-8 py-8">
          <div className="text-left mb-10">
            <h1 className="text-3xl font-medium">Welcome Back!</h1>
            <p className="text-base font-medium text-[#707070]">
              Enter your Credentials to access your account
            </p>
          </div>
          <div className="mt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="peer w-full px-4 h-[52px] pb-3 pt-5 border border-gray-300 rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:border-transparent"
                  placeholder="Email address"
                />
                <label className="absolute left-4 top-1 text-xs text-[#707070] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#707070] peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#624108]">
                  Email address
                </label>
              </div>

              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="peer w-full px-4 pb-3 h-[52px] pt-5 border border-gray-300 rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#624108] focus:border-transparent"
                  placeholder="Password"
                />
                <label className="absolute left-4 top-1 text-xs text-[#707070] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#707070] peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#624108]">
                  Password
                </label>
                <div
                  className="absolute right-4 top-5 cursor-pointer text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                  className="text-sm font-medium text-[#1E99F5]"
                >
                  Forgot Password
                </button>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <div className="flex flex-col justify-center items-center w-4/5 mx-auto space-y-4">
                      <h1 className="text-xl font-semibold">
                        Type your email here
                      </h1>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="input input-bordered p-4 w-full"
                      />
                      <button
                        onClick={handleForgotPassword}
                        className="btn bg-[#1E99F5] hover:bg-[#1E99F5] text-white w-full font-semibold"
                      >
                        Send Reset Email
                      </button>
                    </div>
                  </div>
                </dialog>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register("terms", {
                    required: "You must agree to the terms",
                  })}
                  className="w-4 h-4 text-[#624108] border border-gray-300 rounded focus:ring-0"
                />
                <label className="ml-2 text-sm text-gray-600">
                  I agree to the <a href="/terms">Terms & Policy</a>
                </label>
              </div>

              {/* Submit Button */}
              <div className="">
                <button
                  type="submit"
                  className={`w-full py-4 text-base font-semibold rounded-md transition ${
                    termsAgreed
                      ? "bg-black text-white"
                      : "bg-gray-400 text-gray-200"
                  }`}
                  disabled={!termsAgreed} // Disable if checkbox is not checked
                >
                  Login
                </button>
              </div>
              <div className="flex items-center justify-center">
                <hr className="w-1/3 border-[#F1F0F0]" />
                <span className="px-4 text-gray-500">or</span>
                <hr className="w-1/3 border-[#F1F0F0]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={handleGoogleRegister}
                  className="w-full border-2 py-4 text-black font-semibold gap-2 border-solid flex justify-center items-center"
                >
                  <FcGoogle /> Sign in with Google
                </button>
                <button
                  onClick={handleGoogleRegister}
                  className="w-full border-2 py-4 text-black font-semibold gap-2 border-solid flex justify-center items-center"
                >
                  <BsApple /> Sign in with Apple
                </button>
              </div>
              <h1 className="text-sm font-medium text-center">
                Have an account?{" "}
                <a href="/signUp" className="text-[#1E99F5]">
                  Sign Up
                </a>
              </h1>
            </form>
            <h1>{error}</h1>
          </div>
        </div>
      </div>
      <div
        className="flex-1 flex flex-col justify-center items-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${img})` }}
      >
        <img src={logo} className="mb-4" alt="Logo" />
        <h1 className="text-4xl font-bold text-white">
          Furni<span className="text-[#1E99F5]">Flex</span>
        </h1>
        <p className="text-base font-medium text-[#C8C4C4] text-center mt-4">
          Discover a seamless shopping experience with our curated <br />{" "}
          collection of products. From fashion to electronics, we bring <br />{" "}
          quality.
        </p>
      </div>
    </div>
  );
};

export default Login;

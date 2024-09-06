import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/home/Home.jsx";
import Login from "./components/pages/login/Login.jsx";
import SignUp from "./components/pages/signUp/SignUp.jsx";
import AuthProvider from "./components/provider/AuthProvider.jsx";
import Products from "./components/pages/product/Products.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductItems from "./components/pages/productItems/ProductItems.jsx";
import CartPage from "./components/pages/cart/CartPage.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product",
        element: <Products />,
        children: [
          {
            path: "/product/productsItem/:id",
            element: <ProductItems />,
          },
        ],
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);

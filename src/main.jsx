import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import { Provider } from "react-redux";
import store from "./app/store.js";

import Navbar from "./components/Navbar.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Wishlist from "./pages/wishlist/Wishlist.jsx";
import Profile from "./pages/Profile.jsx";
import Homepage from "./pages/Homepage.jsx";
import Products from "./pages/products/Products.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <Homepage />
      </RouterProvider>
    </Provider>
  </StrictMode>
);

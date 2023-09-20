import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import Root from "./routes/root";
import Home from "./components/Home";
import ItemDetail from "./components/ItemDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/login/Login";
import LoggedIn from "./components/login/LoggedIn";
import LogOut from "./components/login/LogOut";
import Register from "./components/register/Register";
import Admin from "./components/Admin";
import Products from "./components/products/Products";
import UpdateProduct from "./components/products/UpdateProducts";
import DeleteProduct from "./components/products/DeleteProducts";
import AddProduct from "./components/products/AddProduct";
import Users from "./components/user/manageUser";
import DeleteUser from "./components/user/DeleteUser";
import UpdateUser from "./components/user/updateUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/item-detail/:itemId",
        element: <ItemDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout/:cartTotal",
        element: <Checkout />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logged-in",
        element: <LoggedIn />,
      },
      {
        path: "/logout",
        element: <LogOut />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      { path: "/products/addProduct", 
        element: <AddProduct /> },
      {
        id: "prod_update",
        path: "/products/:itemId/update",
        element: <UpdateProduct />,
      },
      {
        path: "./products/:itemId/delete",
        element: <DeleteProduct />,
      },
      {
        path: "/users/",
        element: <Users />,
      },
      {
        path: "/users/:userId/update",
        element: <UpdateUser />,
      },
      {
        path: "/users/:userId/delete",
        element: <DeleteUser />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

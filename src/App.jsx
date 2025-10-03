import "./App.css";
import React, { lazy, Suspense, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import Header from "./Components/Header";
import { Outlet } from "react-router";
import Body from "./Components/Body";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Error from "./Components/Error";
import RestaurantMenu from "./Components/RestaurantMenu";
import Cart from "./Components/Cart";
import UserContext from "./Utils/userContext.js";
import { Provider } from "react-redux";
import appStore from "./Utils/appStore.js";
// import Grocery from "./Components/Grocery";

const Grocery = lazy(() => import("./Components/Grocery.jsx"));

//authentication

const App = () => {
  const [userName, setUserName] = useState();
  const [userLocation, setUserLocation] = useState({
    lat: "26.83730", // Default values
    lng: "80.91650", // Default values
  });

  useEffect(() => {
    // Make an API call and send username and password
    const data = {
      name: "Tushar Sahu",
    };
    setUserName(data.name);
  }, []);
  return (
    <Provider store={appStore}>
      <UserContext value={{ loggedInUser: userName, setUserName }}>
        
          <Header />
          <Outlet context={{ userLocation }} />
        
      </UserContext>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);

let container = document.getElementById("app");
let root = createRoot(container);
root.render(<RouterProvider router={appRouter} />);

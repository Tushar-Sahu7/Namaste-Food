import { Provider } from "react-redux";
import { act } from "react";
import appStore from "../../Utils/appStore";
import { BrowserRouter } from "react-router";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../Header.jsx";
import useOnlineStatus from "../../Utils/useOnlineStatus.js";
jest.mock("../../Utils/useOnlineStatus.js");

it("should have a header component with login button", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const login = screen.getByRole("button", { name: "Login" });
  expect(login).toBeInTheDocument();
});

it("should have a header component with 0 items in the cart", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const cartItems = screen.getByText("(0 Items)");
  expect(cartItems).toBeInTheDocument();
});

it("should change login button to logout and vica versa on click", async () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const login = screen.getByRole("button", { name: "Login" });
  fireEvent.click(login);

  const logout = screen.getByRole("button", { name: "Logout" });
  expect(logout).toBeInTheDocument();

  fireEvent.click(logout);

  expect(login).toBeInTheDocument();
});

it("should correctly show the online status", () => {
  useOnlineStatus.mockReturnValue(true);
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const online = screen.getAllByText("Online Status: 😎");
  expect(online).toBeInTheDocument();
});

it("should correctly show the offline status", () => {
  useOnlineStatus.mockReturnValue(false);
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const offline = screen.getAllByText("Online Status: 🥶");
  expect(offline).toBeInTheDocument();
});

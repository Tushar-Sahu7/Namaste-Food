import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { act } from "react";
import { Provider } from "react-redux";
import RestaurantMenu from "../RestaurantMenu";
import MOCK_DATA from "../mocks/mockResMenuData.json";
import appStore from "../../Utils/appStore";
import Header from "../Header";
import Cart from "../Cart";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("Should load Restaurant menu component", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <RestaurantMenu />
        </Provider>
      </BrowserRouter>
    );
  });

  const accordionHeader = screen.getByText("Flash Sale Pizzas (12)");
  fireEvent.click(accordionHeader);

  const foodItemImages = screen.getAllByRole("img");
  expect(foodItemImages.length).toBe(12);

  expect(screen.getAllByTestId("foodItems").length).toBe(12);
  expect(screen.getByText("(0 Items)")).toBeInTheDocument();
});

it("Should update the item counter in header to 2", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <RestaurantMenu />
        </Provider>
      </BrowserRouter>
    );
  });

  const accordionHeader = screen.getByText("Flash Sale Pizzas (12)");
  fireEvent.click(accordionHeader);

  const addBtns = screen.getAllByRole("button", { name: "Add +" });
  fireEvent.click(addBtns[0]);
  fireEvent.click(addBtns[1]);

  expect(screen.getByText("(2 Items)")).toBeInTheDocument();
  expect(screen.getAllByTestId("foodItems").length).toBe(12);
});

it("Should show 2 items in the cart page", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <RestaurantMenu />
          <Cart />
        </Provider>
      </BrowserRouter>
    );
  });

  const accordionHeader = screen.getByText("Flash Sale Pizzas (12)");
  fireEvent.click(accordionHeader);

  //12 items in resMenu + 2 items in cart
  expect(screen.getAllByTestId("foodItems").length).toBe(14);
});

it("Should clear all the item when clear cart button is clicked", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Cart />
        </Provider>
      </BrowserRouter>
    );
  });

  const clrBtn = screen.getByRole("button", { name: "Clear Cart" });
  fireEvent.click(clrBtn);
  expect(
    screen.getByText("No items in the Cart, Please add some items!")
  ).toBeInTheDocument();
});

it("Should show placeholder img when no img is fetched", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <RestaurantMenu />
        </Provider>
      </BrowserRouter>
    );
  });

  const placeholder = screen
    .getAllByTestId("foodItems")
    .filter((item) => item.querySelector(".placeholder"));

  expect(placeholder.length).toBe(1);
});

import { fireEvent, render, screen } from "@testing-library/react";
import Body from "../Body";
import MOCK_DATA from "../mocks/mockResListData.json";
import { act } from "react";
import { BrowserRouter } from "react-router";
import "@testing-library/jest-dom";
import UserContext from "../../Utils/userContext";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("Should search Res List for burger text input on search button click", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  });

  const cardsBeforeSearch = screen.getAllByTestId("resCard");
  expect(cardsBeforeSearch.length).toBe(20);

  const searchBtn = screen.getByRole("button", { name: "Search" });
  const searchInput = screen.getByTestId("searchInput");

  fireEvent.change(searchInput, { target: { value: "burger" } });
  fireEvent.click(searchBtn);

  const cardsAfterSearch = screen.getAllByTestId("resCard");
  expect(cardsAfterSearch.length).toBe(6);
});

it("Should search Res List for burger text input on enter keydown", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  });

  const cardsBeforeSearch = screen.getAllByTestId("resCard");
  expect(cardsBeforeSearch.length).toBe(20);

  const searchBtn = screen.getByRole("button", { name: "Search" });
  const searchInput = screen.getByTestId("searchInput");

  fireEvent.change(searchInput, { target: { value: "burger" } });
  fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter", charCode: 13 });

  const cardsAfterSearch = screen.getAllByTestId("resCard");
  expect(cardsAfterSearch.length).toBe(6);
});

it("Should filter Top Restaurants", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  });

  const cardsBeforeClick = screen.getAllByTestId("resCard");
  expect(cardsBeforeClick.length).toBe(20);

  const topRatedBtn = screen.getByRole("button", {
    name: "Top Rated Restaurants",
  });
  fireEvent.click(topRatedBtn);

  const cardsAfterClick = screen.getAllByTestId("resCard");
  expect(cardsAfterClick.length).toBe(6);
});

it("Should correctly show the username and call setUserName on change", async () => {
  const mockSetUserName = jest.fn();
  await act(async () => {
    render(
      <BrowserRouter>
        <UserContext.Provider
          value={{ loggedInUser: "Tushar Sahu", setUserName: mockSetUserName }}
        >
          <Body />
        </UserContext.Provider>
      </BrowserRouter>
    );
  });

  const usernameInput = screen.getByTestId("username");
  expect(usernameInput.value).toBe("Tushar Sahu");

  fireEvent.change(usernameInput, { target: { value: "Akshay Saini" } });
  expect(mockSetUserName).toHaveBeenCalledWith("Akshay Saini");
});

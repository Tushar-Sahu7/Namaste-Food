import Body from "../Body";
import { act } from "react";
import { BrowserRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import useOnlineStatus from "../../Utils/useOnlineStatus";
import MOCK_DATA from "../mocks/mockResListData.json";
jest.mock("../../Utils/useOnlineStatus");

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("should show offline warning message when offline", async () => {
  useOnlineStatus.mockReturnValue(false);
  await act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  });

  const offlineMessage = screen.getByText(
    "You are Offline! Please check your internet connection"
  );
  expect(offlineMessage).toBeInTheDocument();
});

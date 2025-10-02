import { render, screen } from "@testing-library/react";
import RestaurantCard, { withPromotedLabel } from "../RestaurantCard";
import MOCK_DATA from "../mocks/resCardMock.json";
import "@testing-library/jest-dom";

it("Should render RestaurantCard component with props Data", () => {
  render(<RestaurantCard resData={MOCK_DATA} />);

  const name = screen.getByText("Pizza Hut");
  expect(name).toBeInTheDocument();
});

it("Should render RestaurantCard component with Promoted Label", () => {
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  render(<RestaurantCardPromoted resData={MOCK_DATA} />);

  const promotedLabel = screen.getByText("Open");

  expect(promotedLabel).toBeInTheDocument();
});

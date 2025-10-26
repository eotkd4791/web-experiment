import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HelloButton from "./HelloButton";

test("increments count on click", async () => {
  const user = userEvent.setup();
  render(<HelloButton />);

  const button = screen.getByRole("button", { name: /hello/i });
  expect(button).toHaveTextContent("Clicked 0 times");

  await user.click(button);
  expect(button).toHaveTextContent("Clicked 1 times");

  await user.click(button);
  expect(button).toHaveTextContent("Clicked 2 times");
});

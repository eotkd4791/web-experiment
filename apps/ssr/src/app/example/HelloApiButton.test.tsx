import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HelloApiButton from "./HelloApiButton";
import { server } from "@/test/mocks/server";
import { http, HttpResponse } from "msw";

test("fetches and displays message from API", async () => {
  const user = userEvent.setup();
  render(<HelloApiButton />);

  await user.click(screen.getByRole("button", { name: /fetch/i }));

  const message = await screen.findByText(/Hello from MSW!/i);
  expect(message).toBeInTheDocument();
});

test("handles error", () => {
  server.use(
    http.get("/api/hello", () =>
      HttpResponse.json({
        message: "Error!",
      }),
    ),
  );
});

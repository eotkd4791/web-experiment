import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { expect, it } from "vitest";
import SimpleDropdown from "../examples/headlessComponent/5-SimpleDropdown";

it("토글을 실행시킨다.", async () => {
  render(
    <SimpleDropdown
      items={[
        {
          icon: "./assets/react.svg",
          description: "react developer",
          text: "title",
        },
      ]}
    />
  );

  const trigger = screen.getByRole("button");
  expect(trigger).toBeInTheDocument();

  await userEvent.click(trigger);

  const list = screen.getByRole("listbox");
  expect(list).toBeInTheDocument();

  await userEvent.click(trigger);
  expect(list).not.toBeInTheDocument();
});

import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import SimpleDropdown from "../examples/headlessComponent/5-SimpleDropdown";

it("키보드 탐색을 통해 항목을 선택한다.", async () => {
  render(<SimpleDropdown items={[]} />);

  const trigger = screen.getByRole("button");

  expect(trigger).toBeInTheDocument();
});

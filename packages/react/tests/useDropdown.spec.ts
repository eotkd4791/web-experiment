import { renderHook, waitFor } from "@testing-library/react";
import { it } from "vitest";
import useDropdown from "../examples/headlessComponent/4-useDropdown";

interface Item {
  icon: string;
  text: string;
  description: string;
}

const items: Item[] = [
  { text: "Apple", icon: "", description: "" },
  { text: "Orange", icon: "", description: "" },
  { text: "Banana", icon: "", description: "" },
];

it("드롭다운 열기/닫기 상태 처리", async () => {
  const { result } = renderHook(() => useDropdown(items));

  expect(result.current.isOpen).toBe(false);

  await waitFor(() => {
    result.current.toggleDropdown();
  });

  expect(result.current.isOpen).toBe(true);

  await waitFor(() => {
    result.current.toggleDropdown();
  });

  expect(result.current.isOpen).toBe(false);
});

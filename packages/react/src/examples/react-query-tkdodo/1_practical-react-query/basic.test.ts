import { renderHook } from "@testing-library/react";
import { useTodosQuery } from "./basic";
import { wrapper } from "@/utils/test-utils";

describe("basic test", () => {
  it("initialData empty", () => {
    const { result } = renderHook(() => useTodosQuery("all"), { wrapper });
    expect(result.current.data).not.toBeDefined();
  });
});

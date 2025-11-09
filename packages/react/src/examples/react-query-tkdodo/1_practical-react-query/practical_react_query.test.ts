import { renderHook, waitFor } from "@testing-library/react";
import { wrapper } from "@/utils/test-utils";
import { useTodosQuery as useTodosQueryBasic } from "./basic";
import { useTodosQuery as useTodosQuery } from "./recommended";

describe("react query test", () => {
  it("basic query does not set initial data", async () => {
    const { result } = renderHook(() => useTodosQueryBasic("all"), { wrapper });

    expect(result.current.data).not.toBeDefined();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toHaveLength(4);
  });

  it("set initial data", async () => {
    const { result } = renderHook(() => useTodosQuery("all"), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });
});

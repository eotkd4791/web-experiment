import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
export function useCustomHook({ id }: { id: number }) {
  const { data: result } = useQuery<Todo>({
    queryKey: ["todo", id],
    queryFn: () =>
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then((response) => response.json())
        .then((json) => json)
        .catch(console.error),
  });

  useEffect(() => {
    console.log("result is rendering", result);
  }, [result]);

  return { result };
}

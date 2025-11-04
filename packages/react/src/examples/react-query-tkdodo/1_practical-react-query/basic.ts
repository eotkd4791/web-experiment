import { http } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

type State = "all" | "open" | "done";
type Todo = { id: number; state: State };
type Todos = ReadonlyArray<Todo>;

const fetchTodos = async (state: State): Promise<Todos> => {
  const response = await http.get(`todos/${state}`);
  return response.data;
};

export const useTodosQuery = (state: State) => {
  return useQuery({
    queryKey: ["todos", state],
    queryFn: () => fetchTodos(state),
  });
};

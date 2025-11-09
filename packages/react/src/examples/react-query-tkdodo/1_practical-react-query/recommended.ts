import { client } from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type State = "all" | "open" | "done";
type Todo = { id: number; state: State };
type Todos = ReadonlyArray<Todo>;

const fetchTodos = async (state: State): Promise<Todos> => {
  const response = await client.get<Todos>(`todos/${state}`);
  return response;
};

export const useTodosQuery = (state: State) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["todos", state],
    queryFn: () => fetchTodos(state),
    initialData: () => {
      const allTodos = queryClient.getQueryData<Todos>(["todos", "all"]);
      const filteredData = allTodos?.filter((todo) => todo.state === state) ?? [];
      return filteredData.length > 0 ? filteredData : undefined;
    },
  });
};

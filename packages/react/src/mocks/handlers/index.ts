import { http, HttpResponse } from "msw";

type State = "all" | "open" | "done";
type Todo = { id: number; state: State };
type Todos = ReadonlyArray<Todo>;

export const handlers = [
  http.get("/todos/:state", () => {
    return HttpResponse.json<Todos>([
      { id: 1, state: "open" },
      { id: 2, state: "done" },
      { id: 3, state: "open" },
      { id: 4, state: "done" },
    ]);
  }),
  http.post("/todos/:state", () => {
    console.log("POST /todos/:state!!!");
    return HttpResponse.json<Todo>({ id: 5, state: "open" });
  }),
];

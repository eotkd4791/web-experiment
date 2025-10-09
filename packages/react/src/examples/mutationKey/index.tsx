import { fakerKO as faker } from "@faker-js/faker";
import {
  useMutation,
  useMutationState,
  useIsMutating,
} from "@tanstack/react-query";

const MUTATION_KEY = { TODO: "TODO" } as const;

type Todo = {
  title: string;
  body: string;
  id: number;
};

export default function Example() {
  const { mutate } = useMutation({
    mutationKey: [MUTATION_KEY.TODO],
    mutationFn: async ({ id, title, body }: Todo) => {
      const response = await fetch("http://localhost:5173/posts?error=false", {
        method: "POST",
        body: JSON.stringify({
          id,
          title,
          body,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      if (response.ok) {
        return await response.json();
      }

      throw new Error("error");
    },
  });

  const isMutatingTodo = useIsMutating({
    mutationKey: [MUTATION_KEY.TODO],
  });
  const todoMutationState = useMutationState<Todo>({
    filters: {
      mutationKey: [MUTATION_KEY.TODO],
    },
  });

  const onClick = () => {
    let id = 4;
    return () => {
      mutate({
        id: ++id,
        title: faker.music.songName(),
        body: faker.music.genre(),
      });
    };
  };
  return (
    <div>
      <dl>
        <dt>isMutating</dt>
        <dd>{isMutatingTodo}</dd>
      </dl>
      <dl>
        <dt>submitAt</dt>
        <dd>
          <pre>{JSON.stringify(todoMutationState, null, 2)}</pre>
        </dd>
      </dl>
      <button onClick={onClick()}>mutate</button>
    </div>
  );
}

export type State = 'all' | 'open' | 'done';

export class Todo {
  id: number;
  title: string;
  state: State;
}

export type Todos = ReadonlyArray<Todo>;

import { State } from '../entities/todo.entity';

export class CreateTodoDto {
  title: string;
  state?: State;
}

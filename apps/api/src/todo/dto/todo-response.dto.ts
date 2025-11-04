import { State } from '../entities/todo.entity';

export class TodoResponseDto {
  id: number;
  state: State;
  title: string;
}

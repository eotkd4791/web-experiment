import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, State } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, state: 'open', title: 'Learn NestJS' },
    { id: 2, state: 'done', title: 'Setup project' },
    { id: 3, state: 'open', title: 'Build Todo API' },
  ];
  private nextId = 4;

  findAll(state?: State): Todo[] {
    if (!state || state === 'all') {
      return this.todos;
    }
    return this.todos.filter((todo) => todo.state === state);
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  create(createTodoDto: CreateTodoDto): Todo {
    const newTodo: Todo = {
      id: this.nextId++,
      state: createTodoDto.state ?? 'open',
      title: createTodoDto.title,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);
    const updatedTodo = {
      ...todo,
      ...updateTodoDto,
    };
    const index = this.todos.findIndex((t) => t.id === id);
    this.todos[index] = updatedTodo;
    return updatedTodo;
  }

  delete(id: number): void {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    this.todos.splice(index, 1);
  }
}

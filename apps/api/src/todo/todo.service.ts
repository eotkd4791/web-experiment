import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, State } from './entities/todo.entity';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  findAll(state?: State): Promise<Todo[]> {
    return this.todoRepository.findAll(state);
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne(id);

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return todo;
  }

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoRepository.create(createTodoDto);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todoRepository.update(id, updateTodoDto);

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return todo;
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.todoRepository.delete(id);

    if (!deleted) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DbService } from '../db/db.service';
import { todos } from '../db/schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { type State, type Todo } from './entities/todo.entity';

@Injectable()
export class TodoRepository {
  constructor(private readonly dbService: DbService) {}

  async findAll(state?: State): Promise<Todo[]> {
    if (!state || state === 'all') {
      return this.dbService.db.select().from(todos);
    }

    return this.dbService.db.select().from(todos).where(eq(todos.state, state));
  }

  async findOne(id: number): Promise<Todo | undefined> {
    const [todo] = await this.dbService.db
      .select()
      .from(todos)
      .where(eq(todos.id, id))
      .limit(1);

    return todo;
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const [todo] = await this.dbService.db
      .insert(todos)
      .values({
        title: createTodoDto.title,
        state: createTodoDto.state ?? 'open',
      })
      .returning();

    return todo;
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo | undefined> {
    const [todo] = await this.dbService.db
      .update(todos)
      .set(updateTodoDto)
      .where(eq(todos.id, id))
      .returning();

    return todo;
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await this.dbService.db
      .delete(todos)
      .where(eq(todos.id, id))
      .returning({
        id: todos.id,
      });

    return deleted.length > 0;
  }
}

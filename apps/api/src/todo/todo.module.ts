import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TodoRepository } from './todo.repository';

@Module({
  imports: [DbModule],
  controllers: [TodoController],
  providers: [TodoService, TodoRepository],
})
export class TodoModule {}

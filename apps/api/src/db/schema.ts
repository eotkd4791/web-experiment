import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

import { type State } from '../todo/entities/todo.entity';

export const todos = pgTable('todos', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  state: varchar('state', { length: 10 })
    .$type<State>()
    .notNull()
    .default('open'),
});

export type TodoRow = typeof todos.$inferSelect;
export type NewTodoRow = typeof todos.$inferInsert;

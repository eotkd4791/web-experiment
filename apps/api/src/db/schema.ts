import {
  bigint,
  boolean,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const customerGradeEnum = pgEnum('customer_grade', [
  'BRONZE',
  'SILVER',
  'GOLD',
  'VIP',
]);
export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'paid',
  'preparing',
  'shipped',
  'delivered',
  'confirmed',
  'cancelled',
  'return_requested',
  'returned',
]);
export const paymentStatusEnum = pgEnum('payment_status', [
  'pending',
  'completed',
  'failed',
  'refunded',
]);

export const categories = pgTable('categories', {
  id: integer('id').primaryKey(),
  parentId: integer('parent_id'),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull(),
  depth: integer('depth').notNull(),
  sortOrder: integer('sort_order').notNull(),
  isActive: boolean('is_active').notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const products = pgTable('products', {
  id: integer('id').primaryKey(),
  categoryId: integer('category_id').notNull(),
  supplierId: integer('supplier_id').notNull(),
  successorId: integer('successor_id'),
  name: varchar('name', { length: 500 }).notNull(),
  sku: varchar('sku', { length: 50 }).notNull(),
  brand: varchar('brand', { length: 100 }).notNull(),
  modelNumber: varchar('model_number', { length: 50 }),
  description: text('description'),
  specs: jsonb('specs'),
  price: numeric('price', { precision: 12, scale: 2 }).notNull(),
  costPrice: numeric('cost_price', { precision: 12, scale: 2 }).notNull(),
  stockQty: integer('stock_qty').notNull(),
  weightGrams: integer('weight_grams'),
  isActive: boolean('is_active').notNull(),
  discontinuedAt: timestamp('discontinued_at'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const customers = pgTable('customers', {
  id: integer('id').primaryKey(),
  email: varchar('email', { length: 200 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  grade: customerGradeEnum('grade').notNull(),
  pointBalance: integer('point_balance').notNull(),
  isActive: boolean('is_active').notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const orders = pgTable('orders', {
  id: integer('id').primaryKey(),
  orderNumber: varchar('order_number', { length: 30 }).notNull(),
  customerId: integer('customer_id').notNull(),
  addressId: integer('address_id').notNull(),
  staffId: integer('staff_id'),
  status: orderStatusEnum('status').notNull(),
  totalAmount: numeric('total_amount', { precision: 12, scale: 2 }).notNull(),
  discountAmount: numeric('discount_amount', {
    precision: 12,
    scale: 2,
  }).notNull(),
  shippingFee: numeric('shipping_fee', { precision: 12, scale: 2 }).notNull(),
  pointUsed: integer('point_used').notNull(),
  pointEarned: integer('point_earned').notNull(),
  notes: text('notes'),
  orderedAt: timestamp('ordered_at').notNull(),
  completedAt: timestamp('completed_at'),
  cancelledAt: timestamp('cancelled_at'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const orderItems = pgTable('order_items', {
  id: integer('id').primaryKey(),
  orderId: integer('order_id').notNull(),
  productId: integer('product_id').notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: numeric('unit_price', { precision: 12, scale: 2 }).notNull(),
  discountAmount: numeric('discount_amount', {
    precision: 12,
    scale: 2,
  }).notNull(),
  subtotal: numeric('subtotal', { precision: 12, scale: 2 }).notNull(),
});

export const payments = pgTable('payments', {
  id: integer('id').primaryKey(),
  orderId: integer('order_id').notNull(),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  status: paymentStatusEnum('status').notNull(),
  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').notNull(),
});

export const reviews = pgTable('reviews', {
  id: integer('id').primaryKey(),
  productId: integer('product_id').notNull(),
  customerId: integer('customer_id').notNull(),
  orderId: integer('order_id').notNull(),
  rating: integer('rating').notNull(),
  title: varchar('title', { length: 200 }),
  content: text('content'),
  isVerified: boolean('is_verified').notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at'),
});

export const productViews = pgTable('product_views', {
  id: bigint('id', { mode: 'number' }).primaryKey(),
  productId: integer('product_id').notNull(),
  customerId: integer('customer_id'),
  viewedAt: timestamp('viewed_at').notNull(),
});

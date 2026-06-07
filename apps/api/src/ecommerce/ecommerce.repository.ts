import { Injectable } from '@nestjs/common';
import { count, desc, eq, sql } from 'drizzle-orm';

import { DbService } from '../db/db.service';
import {
  categories,
  customers,
  orderItems,
  orders,
  products,
  reviews,
} from '../db/schema';

export interface CommerceDashboard {
  totalCustomers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalReviews: number;
  totalProductViews: number;
}

export interface ProductListItem {
  id: number;
  name: string;
  brand: string;
  categoryName: string;
  price: number;
  stockQty: number;
  averageRating: number | null;
}

export interface RecentOrderItem {
  id: number;
  orderNumber: string;
  customerName: string;
  status: string;
  totalAmount: number;
  orderedAt: string;
}

export interface TopCustomerItem {
  id: number;
  name: string;
  email: string;
  grade: string;
  totalSpend: number;
  orderCount: number;
}

@Injectable()
export class EcommerceRepository {
  constructor(private readonly dbService: DbService) {}

  async getDashboard(): Promise<CommerceDashboard> {
    const result = await this.dbService.db.execute<{
      totalCustomers: string;
      totalProducts: string;
      totalOrders: string;
      totalRevenue: string;
      totalReviews: string;
      totalProductViews: string;
    }>(sql`
      select
        (select count(*)::text from customers) as "totalCustomers",
        (select count(*)::text from products) as "totalProducts",
        (select count(*)::text from orders) as "totalOrders",
        (select coalesce(sum(total_amount), 0)::text from orders where status in ('confirmed', 'delivered')) as "totalRevenue",
        (select count(*)::text from reviews) as "totalReviews",
        (select count(*)::text from product_views) as "totalProductViews"
    `);
    const summary = result.rows[0];

    if (!summary) {
      return {
        totalCustomers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        totalReviews: 0,
        totalProductViews: 0,
      };
    }

    return {
      totalCustomers: Number(summary.totalCustomers),
      totalProducts: Number(summary.totalProducts),
      totalOrders: Number(summary.totalOrders),
      totalRevenue: Number(summary.totalRevenue),
      totalReviews: Number(summary.totalReviews),
      totalProductViews: Number(summary.totalProductViews),
    };
  }

  async getProducts(
    limit: number,
    categoryId?: number,
  ): Promise<ProductListItem[]> {
    const averageRating = sql<
      number | null
    >`round(avg(${reviews.rating})::numeric, 2)`;
    const query = this.dbService.db
      .select({
        id: products.id,
        name: products.name,
        brand: products.brand,
        categoryName: categories.name,
        price: products.price,
        stockQty: products.stockQty,
        averageRating,
      })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .leftJoin(reviews, eq(products.id, reviews.productId))
      .groupBy(products.id, categories.name)
      .orderBy(desc(products.createdAt))
      .limit(limit);

    const rows = categoryId
      ? await query.where(eq(products.categoryId, categoryId))
      : await query;

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      brand: row.brand,
      categoryName: row.categoryName,
      price: Number(row.price),
      stockQty: row.stockQty,
      averageRating: row.averageRating,
    }));
  }

  async getRecentOrders(limit: number): Promise<RecentOrderItem[]> {
    const rows = await this.dbService.db
      .select({
        id: orders.id,
        orderNumber: orders.orderNumber,
        customerName: customers.name,
        status: orders.status,
        totalAmount: orders.totalAmount,
        orderedAt: orders.orderedAt,
      })
      .from(orders)
      .innerJoin(customers, eq(orders.customerId, customers.id))
      .orderBy(desc(orders.orderedAt))
      .limit(limit);

    return rows.map((row) => ({
      id: row.id,
      orderNumber: row.orderNumber,
      customerName: row.customerName,
      status: row.status,
      totalAmount: Number(row.totalAmount),
      orderedAt: row.orderedAt.toISOString(),
    }));
  }

  async getTopCustomers(limit: number): Promise<TopCustomerItem[]> {
    const rows = await this.dbService.db
      .select({
        id: customers.id,
        name: customers.name,
        email: customers.email,
        grade: customers.grade,
        totalSpend: sql<number>`sum(${orders.totalAmount})`,
        orderCount: count(orders.id),
      })
      .from(customers)
      .innerJoin(orders, eq(customers.id, orders.customerId))
      .where(sql`${orders.status} in ('confirmed', 'delivered')`)
      .groupBy(customers.id)
      .orderBy(desc(sql`sum(${orders.totalAmount})`))
      .limit(limit);

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      grade: row.grade,
      totalSpend: Number(row.totalSpend),
      orderCount: row.orderCount,
    }));
  }

  async getOrderItemSummary(
    limit: number,
  ): Promise<
    Array<{ productId: number; productName: string; soldQuantity: number }>
  > {
    const rows = await this.dbService.db
      .select({
        productId: products.id,
        productName: products.name,
        soldQuantity: sql<number>`sum(${orderItems.quantity})`,
      })
      .from(orderItems)
      .innerJoin(products, eq(orderItems.productId, products.id))
      .groupBy(products.id)
      .orderBy(desc(sql`sum(${orderItems.quantity})`))
      .limit(limit);

    return rows.map((row) => ({
      productId: row.productId,
      productName: row.productName,
      soldQuantity: Number(row.soldQuantity),
    }));
  }
}

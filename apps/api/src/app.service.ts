import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppInfo() {
    return {
      name: 'web-experiment api',
      database: 'web-experiment-db',
      dataset: 'civilian7/sql-tutorial small ko',
      routes: {
        dashboard: '/commerce/dashboard',
        products: '/commerce/products?limit=20&categoryId=18',
        recentOrders: '/commerce/orders/recent?limit=20',
        topCustomers: '/commerce/customers/top?limit=10',
        bestSellers: '/commerce/products/best-sellers?limit=10',
      },
    };
  }
}

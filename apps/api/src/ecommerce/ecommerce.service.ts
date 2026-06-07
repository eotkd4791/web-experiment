import { Injectable } from '@nestjs/common';

import {
  CommerceDashboard,
  EcommerceRepository,
  ProductListItem,
  RecentOrderItem,
  TopCustomerItem,
} from './ecommerce.repository';

@Injectable()
export class EcommerceService {
  constructor(private readonly ecommerceRepository: EcommerceRepository) {}

  getDashboard(): Promise<CommerceDashboard> {
    return this.ecommerceRepository.getDashboard();
  }

  getProducts(limit: number, categoryId?: number): Promise<ProductListItem[]> {
    return this.ecommerceRepository.getProducts(limit, categoryId);
  }

  getRecentOrders(limit: number): Promise<RecentOrderItem[]> {
    return this.ecommerceRepository.getRecentOrders(limit);
  }

  getTopCustomers(limit: number): Promise<TopCustomerItem[]> {
    return this.ecommerceRepository.getTopCustomers(limit);
  }

  getBestSellingProducts(limit: number) {
    return this.ecommerceRepository.getOrderItemSummary(limit);
  }
}

import { ApiProperty } from '@nestjs/swagger';

export class CommerceDashboardDto {
  @ApiProperty({ example: 5230 })
  totalCustomers!: number;

  @ApiProperty({ example: 280 })
  totalProducts!: number;

  @ApiProperty({ example: 37557 })
  totalOrders!: number;

  @ApiProperty({ example: 34582358414 })
  totalRevenue!: number;

  @ApiProperty({ example: 8546 })
  totalReviews!: number;

  @ApiProperty({ example: 327871 })
  totalProductViews!: number;
}

export class ProductListItemDto {
  @ApiProperty({ example: 280 })
  id!: number;

  @ApiProperty({ example: 'Logitech MX Master 3S 블랙' })
  name!: string;

  @ApiProperty({ example: 'Logitech' })
  brand!: string;

  @ApiProperty({ example: '마우스' })
  categoryName!: string;

  @ApiProperty({ example: 129000 })
  price!: number;

  @ApiProperty({ example: 42 })
  stockQty!: number;

  @ApiProperty({ example: 4.67, nullable: true })
  averageRating!: number | null;
}

export class RecentOrderItemDto {
  @ApiProperty({ example: 37557 })
  id!: number;

  @ApiProperty({ example: 'ORD-20250630-0001' })
  orderNumber!: string;

  @ApiProperty({ example: '김민재' })
  customerName!: string;

  @ApiProperty({ example: 'delivered' })
  status!: string;

  @ApiProperty({ example: 189000 })
  totalAmount!: number;

  @ApiProperty({ example: '2025-06-30T14:32:11.000Z' })
  orderedAt!: string;
}

export class TopCustomerItemDto {
  @ApiProperty({ example: 226 })
  id!: number;

  @ApiProperty({ example: '박정수' })
  name!: string;

  @ApiProperty({ example: 'user226@testmail.kr' })
  email!: string;

  @ApiProperty({ example: 'VIP' })
  grade!: string;

  @ApiProperty({ example: 403081258 })
  totalSpend!: number;

  @ApiProperty({ example: 302 })
  orderCount!: number;
}

export class BestSellerItemDto {
  @ApiProperty({ example: 75 })
  productId!: number;

  @ApiProperty({ example: 'Crucial T700 2TB 실버' })
  productName!: string;

  @ApiProperty({ example: 1503 })
  soldQuantity!: number;
}

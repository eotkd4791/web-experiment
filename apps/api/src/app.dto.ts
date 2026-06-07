import { ApiProperty } from '@nestjs/swagger';

export class AppRoutesDto {
  @ApiProperty({ example: '/docs' })
  docs!: string;

  @ApiProperty({ example: '/docs-json' })
  docsJson!: string;

  @ApiProperty({ example: '/commerce/dashboard' })
  dashboard!: string;

  @ApiProperty({ example: '/commerce/products?limit=20&categoryId=18' })
  products!: string;

  @ApiProperty({ example: '/commerce/orders/recent?limit=20' })
  recentOrders!: string;

  @ApiProperty({ example: '/commerce/customers/top?limit=10' })
  topCustomers!: string;

  @ApiProperty({ example: '/commerce/products/best-sellers?limit=10' })
  bestSellers!: string;
}

export class AppInfoDto {
  @ApiProperty({ example: 'web-experiment api' })
  name!: string;

  @ApiProperty({ example: 'web-experiment-db' })
  database!: string;

  @ApiProperty({ example: 'civilian7/sql-tutorial small ko' })
  dataset!: string;

  @ApiProperty({ type: AppRoutesDto })
  routes!: AppRoutesDto;
}

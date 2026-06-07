import {
  BadRequestException,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

import { EcommerceService } from './ecommerce.service';

function parseOptionalInt(
  rawValue: string | undefined,
  fieldName: string,
): number | undefined {
  if (!rawValue) {
    return undefined;
  }

  const parsed = Number.parseInt(rawValue, 10);

  if (Number.isNaN(parsed)) {
    throw new BadRequestException(`${fieldName} must be an integer`);
  }

  return parsed;
}

@Controller('commerce')
export class EcommerceController {
  constructor(private readonly ecommerceService: EcommerceService) {}

  @Get('dashboard')
  getDashboard() {
    return this.ecommerceService.getDashboard();
  }

  @Get('products')
  getProducts(
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('categoryId') categoryId?: string,
  ) {
    const parsedCategoryId = parseOptionalInt(categoryId, 'categoryId');

    return this.ecommerceService.getProducts(limit, parsedCategoryId);
  }

  @Get('orders/recent')
  getRecentOrders(
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.ecommerceService.getRecentOrders(limit);
  }

  @Get('customers/top')
  getTopCustomers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.ecommerceService.getTopCustomers(limit);
  }

  @Get('products/best-sellers')
  getBestSellingProducts(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.ecommerceService.getBestSellingProducts(limit);
  }
}

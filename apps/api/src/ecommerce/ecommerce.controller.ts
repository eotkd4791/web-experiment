import {
  BadRequestException,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import {
  BestSellerItemDto,
  CommerceDashboardDto,
  ProductListItemDto,
  RecentOrderItemDto,
  TopCustomerItemDto,
} from './dto/ecommerce-response.dto';
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

@ApiTags('commerce')
@Controller('commerce')
export class EcommerceController {
  constructor(private readonly ecommerceService: EcommerceService) {}

  @ApiOperation({ summary: '대시보드 집계 조회' })
  @ApiOkResponse({ type: CommerceDashboardDto })
  @Get('dashboard')
  getDashboard() {
    return this.ecommerceService.getDashboard();
  }

  @ApiOperation({ summary: '상품 목록 조회' })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiQuery({ name: 'categoryId', required: false, example: 18 })
  @ApiOkResponse({ type: ProductListItemDto, isArray: true })
  @Get('products')
  getProducts(
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('categoryId') categoryId?: string,
  ) {
    const parsedCategoryId = parseOptionalInt(categoryId, 'categoryId');

    return this.ecommerceService.getProducts(limit, parsedCategoryId);
  }

  @ApiOperation({ summary: '최근 주문 조회' })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiOkResponse({ type: RecentOrderItemDto, isArray: true })
  @Get('orders/recent')
  getRecentOrders(
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.ecommerceService.getRecentOrders(limit);
  }

  @ApiOperation({ summary: '구매액 상위 고객 조회' })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiOkResponse({ type: TopCustomerItemDto, isArray: true })
  @Get('customers/top')
  getTopCustomers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.ecommerceService.getTopCustomers(limit);
  }

  @ApiOperation({ summary: '판매량 상위 상품 조회' })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiOkResponse({ type: BestSellerItemDto, isArray: true })
  @Get('products/best-sellers')
  getBestSellingProducts(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.ecommerceService.getBestSellingProducts(limit);
  }
}

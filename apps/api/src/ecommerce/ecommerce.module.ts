import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';
import { EcommerceController } from './ecommerce.controller';
import { EcommerceRepository } from './ecommerce.repository';
import { EcommerceService } from './ecommerce.service';

@Module({
  imports: [DbModule],
  controllers: [EcommerceController],
  providers: [EcommerceService, EcommerceRepository],
  exports: [EcommerceService],
})
export class EcommerceModule {}

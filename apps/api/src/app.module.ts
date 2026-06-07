import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { EcommerceModule } from './ecommerce/ecommerce.module';

@Module({
  imports: [DbModule, EcommerceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

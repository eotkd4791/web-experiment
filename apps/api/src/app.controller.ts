import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AppInfoDto } from './app.dto';
import { AppService } from './app.service';

@ApiTags('meta')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'API 메타데이터 조회' })
  @ApiOkResponse({ type: AppInfoDto })
  @Get()
  getAppInfo() {
    return this.appService.getAppInfo();
  }
}

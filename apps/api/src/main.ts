import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Web Experiment API')
    .setDescription(
      'E-commerce practice dataset API for local PostgreSQL study',
    )
    .setVersion('1.0.0')
    .addTag('meta')
    .addTag('commerce')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, swaggerDocument, {
    jsonDocumentUrl: 'docs-json',
  });

  await app.listen(process.env.PORT ?? 8080);
}
void bootstrap();

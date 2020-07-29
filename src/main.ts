import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('API OTAKU')
    .setDescription(
      "Esse é um projeto sem fins lucrativos, o banco de dados conta com +12.000 animes cadastrados, podendo também você cadastrar os animes que te interessam. <p> <a href= 'https://github.com/laurencioScript/api-animes'>Github<a> ",
    )
    .setContact(
      'Gabriel Laurencio',
      'https://www.linkedin.com/in/gabriel-laurencio-barbosa/',
      'laurencio.arkauss@gmail.com',
    )
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);
  SwaggerModule.setup('/api', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

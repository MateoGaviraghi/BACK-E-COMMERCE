import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import { config as auth0Config} from './config/auth0';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerMiddleware } from './middlewares/logger.middlewares';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const loggerMiddleware = new LoggerMiddleware()
  app.use(loggerMiddleware.use)

  app.use(auth(auth0Config));

  app.useGlobalPipes(new ValidationPipe())

  const swaggerConfig = new DocumentBuilder()
                        .setTitle('NEST JS " M4 " ')
                        .setDescription('Esta es una api construida con nestjs, para utilizarla en el proyecto final del modulo 4 de la carrera Full Stack Developer de Henry, en la especialidad de Backend.')
                        .setVersion('1.0')
                        .addBearerAuth()
                        .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document)        

  const PORT = 3000;
  await app.listen(PORT);
}
bootstrap();

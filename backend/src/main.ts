import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Bootstrap the application
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true }); // Autoriser CORS globalement
  app.enableCors({
    origin: 'http://localhost:3000', // Autoriser uniquement ton frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();

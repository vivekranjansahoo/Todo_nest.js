import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(new LoggerMiddleware().use);
  app
    .listen(5000)
    .then(() => {
      console.log('successfully. started on port 5000 ');
    })
    .catch((error) => {
      console.log(error);
    });
}
bootstrap();

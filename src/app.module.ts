import { Module } from '@nestjs/common';
import { UserService } from './users/user.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from './config/config.module';
import { BlogModule } from './blog/blog.module';
import { ProtectedController } from './protected/protected.controller';
import { TodoController } from './todos/todo.controller';
import { TodoService } from './todos/todo.service';

@Module({
  imports: [
    ConfigModule,
    BlogModule,

    JwtModule.register({
      secret: 'vivek',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [
    AuthController,
    UsersController,
    ProtectedController,
    TodoController,
  ],
  providers: [UserService, AuthService, TodoService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

// Это модуль пользователя
@Module({
  // Все, что нужно здесь знать, это вот эта строка. Тут мы оставляем ссылку на сущность пользователя, чтоб проинициализировать ее в базе данных
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

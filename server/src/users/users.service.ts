import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    // Тут мы оставляем ссылку на таблицу пользоватей в базе данных
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // Тут происходит обработка запроса получения всех пользователей
  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  // Тут происходит обработка запроса создания нового пользователя
  async addUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = await this.userRepository.create({ ...createUserDto });
    return await this.userRepository.save(newUser);
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

// Это контроллер. Нужен для того, чтобы принимать запросы от клиента и передавать запросы в сервис, где происходит обработка запроса и возврат в контроллер. Контроллер после выполнения обработки вернет ответ на клиент
// в скобках задается первый уровень эндпоинта
// в итоге получится такой эндпоинт http://host:port/api/users
@Controller('users')
export class UsersController {
  // В конструкторе оставляем ссылку на сервис пользователя, где происходит обработка запросов
  constructor(private readonly usersService: UsersService) {}

  /* С помощью ДЕКОРАТОРА Get мы объявляем ЭНДПОИНТ метода GET. В () задаем сам эндпоинт (если в скобках ничего нет, значит в эндпоинте запроса ниче не пишем на этом уровне)
   * В итоге получится такой эндпоинт http://host:port/api/users
   */
  @Get()
  getAll(): Promise<UserEntity[]> {
    return this.usersService.getAll();
  }

  /* С помощью ДЕКОРАТОРА Post мы объявляем ЭНДПОИНТ метода POST.
   *  В итоге получится такой эндпоинт http://host:port/api/users/add и в запросе передаем данные типа CreateUserDto (DTO = data transfer object)
   */
  @Post('add')
  addUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.addUser(createUserDto);
  }
}

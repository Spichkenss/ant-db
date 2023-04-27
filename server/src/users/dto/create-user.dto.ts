// Класс, описывающий тип данных, который принимает сервер для создания нового пользователя

export class CreateUserDto {
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly age: number;
}

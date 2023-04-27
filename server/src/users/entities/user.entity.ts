import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Описание сущности пользователя в базе данных
@Entity('users')
export class UserEntity {
  // Primary Key. Ключ для поиска пользователя
  @PrimaryGeneratedColumn()
  id: number;

  // Имя пользователя
  @Column()
  name: string;

  // Фамилия
  @Column()
  surname: string;

  // Возраст
  @Column()
  age: number;

  // Почта
  @Column({ unique: true })
  email: string;

  // ата создания
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/enums/role.enum';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  create(user: User) {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async findOne(username: string) {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async seed() {
    const allUsers = await this.usersRepository.find();
    if (allUsers.length > 0) return;

    const users = [
      {
        username: 'admin',
        password: 'admin',
        role: Role.ADMIN
      },
      {
        username: 'Yaman',
        password: 'Yaman',
        role: Role.USER
      },
      {
        username: 'Hasan',
        password: 'Hasan',
        role: Role.USER
      }
    ];

    users.forEach(async (user) => {
      const newUser = new User();
      newUser.username = user.username;
      newUser.password = user.password;
      newUser.role = user.role;

      await this.create(newUser);
    });
  }
}

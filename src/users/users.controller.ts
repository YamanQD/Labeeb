import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() user: User) {
    return this.usersService.create(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('profile')
  profile(@Request() req) {
    return this.usersService.profile(req.user.username);
  }
}

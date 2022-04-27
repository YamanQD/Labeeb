import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('profile')
  getProfile(@Request() req) {
    return this.appService.getProfile(req.user);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

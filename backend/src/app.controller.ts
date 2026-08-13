import { Controller, Get, Post } from '@nestjs/common';
import { exec } from 'child_process';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('shutdown')
  shutdown() {
    exec('bash ./stop.sh');
    return { status: 'stopping' };
  }
}

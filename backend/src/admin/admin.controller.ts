import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Ajustez selon vos guards
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN') 
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

 @Get('stats')
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }
   @Get('users')
  async getUsers() {
    return this.adminService.getUsers();
  }

}
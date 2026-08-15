import { IsNumber, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminStatsDto {
  @ApiProperty()
  students: number;

  @ApiProperty()
  advisors: number;

  @ApiProperty()
  admins: number;

  @ApiProperty()
  totalUsers: number;
}
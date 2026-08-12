import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { SubscriptionPlan, SubscriptionStatus } from '@prisma/client';

export class CreateSubscriptionDto {
  @ApiProperty({ example: 'usr_123abc', description: 'ID de l’utilisateur' })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({ enum: SubscriptionPlan, default: SubscriptionPlan.FREE })
  @IsEnum(SubscriptionPlan)
  plan!: SubscriptionPlan;

  @ApiProperty({ enum: SubscriptionStatus, default: SubscriptionStatus.ACTIVE })
  @IsEnum(SubscriptionStatus)
  status!: SubscriptionStatus;

  @ApiProperty({ example: '2026-07-29T00:00:00.000Z' })
  @IsDateString()
  startDate!: string;

  @ApiProperty({ example: '2027-07-29T00:00:00.000Z' })
  @IsDateString()
  endDate!: string;

  @ApiPropertyOptional({ example: 'sub_1Nxxx...' })
  @IsOptional()
  @IsString()
  stripeId?: string;
}
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum ContactStatus {
  PENDING = 'PENDING',
  READ = 'READ',
  REPLIED = 'REPLIED',
}

export class UpdateContactDto {
  @ApiPropertyOptional({ enum: ContactStatus, example: ContactStatus.READ })
  @IsEnum(ContactStatus)
  @IsOptional()
  status?: ContactStatus;
}
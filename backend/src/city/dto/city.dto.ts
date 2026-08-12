import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty({
    description: 'Nom de la ville',
    example: 'Montréal',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'ID de la province associée',
    example: 'clx... (ID de la province de Québec)',
  })
  @IsString()
  @IsNotEmpty()
  provinceId !: string;
}
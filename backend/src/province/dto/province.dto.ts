import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProvinceDto {
  @ApiProperty({
    description: 'Nom de la province ou de l’État',
    example: 'Québec',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'ID du pays associé',
    example: 'clx... (ID du pays Canada)',
  })
  @IsString()
  @IsNotEmpty()
  countryId!: string;
}
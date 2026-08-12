import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateUniversityDto {
  @ApiProperty({ example: 'Université de Sherbrooke' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({ example: 'UdeS' })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiPropertyOptional({ example: 'https://www.usherbrooke.ca' })
  @IsUrl()
  @IsOptional()
  website?: string;

  @ApiPropertyOptional({ example: 'Description de l’université...' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'cms22qv1v0000l7sv80876251' })
  @IsString()
  @IsNotEmpty()
  countryId!: string;

  @ApiProperty({ example: 'cms4jpx3j0001l75gj6knoqyz' })
  @IsString()
  @IsNotEmpty()
  provinceId!: string;

  @ApiProperty({ example: 'cms4ruj3z001dl75gbpkr7g89' })
  @IsString()
  @IsNotEmpty()
  cityId!: string;
}

// 👈 Ajoute cette classe en bas du fichier :
export class UpdateUniversityDto extends PartialType(CreateUniversityDto) {}
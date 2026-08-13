import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsUrl } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({ example: 'Ouverture des bourses 2026', description: 'Titre de l\'actualité' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Information', description: 'Catégorie de l\'article' })
  @IsString()
  @IsNotEmpty()
  category!: string;

  @ApiPropertyOptional({ example: 'https://canada.ca/...', description: 'Source externe' })
  @IsOptional()
  @IsUrl()
  source?: string;

  @ApiProperty({ example: 'Détails de l\'annonce...', description: 'Contenu complet' })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiPropertyOptional({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
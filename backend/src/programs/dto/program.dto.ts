import { IsArray, IsString, IsNotEmpty, IsNumber, IsEnum, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { DegreeLevel } from '@prisma/client';
import { PartialType } from '@nestjs/swagger';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProgramDto {
  @ApiProperty({ example: 'Master en Informatique' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ enum: DegreeLevel, example: DegreeLevel.MASTER })
  @IsEnum(DegreeLevel)
  degree!: DegreeLevel;

  @ApiProperty({ example: 2, description: 'Durée en années ou semestres' })
  @IsNumber()
  @Min(1)
  duration!: number;

  @ApiProperty({ example: 5000, description: 'Frais de scolarité' })
  @IsNumber()
  @Min(0)
  tuition!: number;

  @ApiPropertyOptional({ example: 3.2, description: 'GPA / Moyenne minimale requise' })
  @IsNumber()
  @IsOptional()
  minimumGpa?: number;

  @ApiPropertyOptional({ example: 'Formation axée sur l’IA et le génie logiciel.' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'cm3... ID de l’université' })
  @IsString()
  @IsNotEmpty()
  universityId!: string;

  // 👈 AJOUT ICI : 'languages' appartient aussi à CreateProgramDto
  @ApiPropertyOptional({ example: ['Français', 'Anglais'], description: 'Langues d’enseignement' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  languages?: string[];
}

// DTO pour capturer les paramètres de recherche (Query Params)
export class FilterProgramsDto {
  @ApiPropertyOptional({ description: 'Filtrer par nom de pays' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ enum: DegreeLevel })
  @IsOptional()
  @IsEnum(DegreeLevel)
  degree?: DegreeLevel;

  @ApiPropertyOptional({ description: 'Frais de scolarité maximum' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxTuition?: number;

  @ApiPropertyOptional({ description: 'GPA minimal' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minGpa?: number;

  @ApiPropertyOptional({ description: 'Recherche par mot-clé dans le titre' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 'Français', description: 'Langue d’enseignement' })
  @IsOptional()
  @IsString()
  language?: string;
}

// export class UpdateProgramDto
export class UpdateProgramDto extends PartialType(CreateProgramDto) {

}

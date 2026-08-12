import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';

export class MatchRequestDto {
  @ApiPropertyOptional({ example: 'clx123abc456', description: 'ID de l’utilisateur pour sauvegarder l’historique' })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({ example: 3.4, description: 'GPA / Moyenne de l’étudiant (ex: sur 4.0)' })
  @IsNumber()
  @Min(0)
  @Max(4.0)
  gpa!: number;

  @ApiProperty({ example: 10000, description: 'Budget annuel maximum pour les frais de scolarité ($)' })
  @IsNumber()
  @Min(0)
  maxBudget!: number;

  @ApiProperty({ example: ['Français', 'Anglais'], description: 'Langues maîtrisées par l’étudiant' })
  @IsArray()
  @IsString({ each: true })
  languages!: string[];
}
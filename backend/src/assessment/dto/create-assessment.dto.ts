import {
  IsInt,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsEnum,
  IsString,
  IsEmail,     // <-- AJOUTÉ
  IsNotEmpty,  // <-- AJOUTÉ
  Min,
  Max,
} from 'class-validator';
import { DegreeLevel } from '@prisma/client';

// 1. DTO pour le formulaire d'évaluation complet (scores CRS / Québec / Provinces)
export class CreateAssessmentDto {
  @IsInt()
  @Min(18)
  @Max(99)
  age!: number;

  @IsEnum(DegreeLevel)
  educationLevel!: DegreeLevel;

  @IsInt()
  @Min(0)
  workExperienceYrs!: number;

  @IsInt()
  @Min(0)
  @Max(12)
  clbFrench!: number;

  @IsInt()
  @Min(0)
  @Max(12)
  clbEnglish!: number;

  @IsInt()
  @Min(0)
  @Max(5)
  teerCategory!: number;

  @IsBoolean()
  hasValidatedOffer!: boolean;

  // Québec (PSTQ)
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(12)
  quebecFrenchOral?: number;

  @IsOptional()
  @IsBoolean()
  hasQuebecDegree?: boolean;

  @IsOptional()
  @IsString()
  quebecJobOfferRegion?: string;

  // Ontario (OINP)
  @IsOptional()
  @IsNumber()
  ontarioHourlyWage?: number;

  @IsOptional()
  @IsBoolean()
  isOutsideGTA?: boolean;

  @IsOptional()
  @IsInt()
  ontarioWorkExpYrs?: number;

  // Colombie-Britannique (BC PNP)
  @IsOptional()
  @IsNumber()
  bcAnnualSalary?: number;

  @IsOptional()
  @IsInt()
  bcRegionZone?: number;

  @IsOptional()
  @IsBoolean()
  hasBcDegree?: boolean;
}

// 2. DTO pour la demande d'accès invité (GuestAssessmentWidget.vue)
export class CreateAssessmentRequestDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  country!: string;

  @IsString()
  @IsOptional()
  phone?: string;
}
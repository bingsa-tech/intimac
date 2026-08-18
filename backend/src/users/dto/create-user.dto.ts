import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  IsNumber,
} from 'class-validator';
import { Gender, Role } from '@prisma/client';

export class CreateUserDto {
  // --- Champs User ---
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @IsEnum(Role)
  role: Role;

  // --- Champs Profile ---
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @IsString()
  @IsNotEmpty()
  nationality: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  highestEducation?: string;

  @IsOptional()
  @IsInt()
  experience?: number;

  @IsOptional()
  @IsNumber()
  gpa?: number;

  @IsOptional()
  @IsNumber()
  budget?: number;

  @IsOptional()
  @IsString()
  englishLevel?: string;

  @IsOptional()
  @IsString()
  frenchLevel?: string;

  @IsOptional()
  @IsString()
  photo?: string;

  // --- Champs métadonnées (Metadata optionnelles) ---
  @IsOptional()
  @IsString()
  targetProfile?: string;

  @IsOptional()
  @IsString()
  studyLevel?: string;

  @IsOptional()
  @IsString()
  researchField?: string;

  @IsOptional()
  @IsString()
  immigrationProgram?: string;

  @IsOptional()
  @IsString()
  eventType?: string;
}
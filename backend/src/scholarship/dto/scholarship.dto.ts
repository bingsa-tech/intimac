import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDateString, IsUrl } from 'class-validator';

export class CreateScholarshipDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsNotEmpty()
  coverageType!: string;

  @IsDateString()
  @IsNotEmpty()
  deadline!: string;

  @IsString()
  @IsNotEmpty()
  countryId!: string;

  @IsString()
  @IsOptional()
  universityId?: string;

  @IsUrl()
  @IsOptional()
  link?: string;
}

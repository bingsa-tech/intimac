// src/countries/dto/country.dto.ts
import { IsString, IsNotEmpty, IsOptional} from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  code?: string;
}
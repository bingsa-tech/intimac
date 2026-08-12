import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsUrl } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsUrl({}, { message: 'La source doit être une URL valide (ex: https://...)' })
  @IsOptional()
  source?: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
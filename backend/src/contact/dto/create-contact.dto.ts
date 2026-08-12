import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ example: 'Jean Dupont', description: 'Nom complet de l\'expéditeur' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'jean.dupont@example.com', description: 'Adresse email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Demande d\'information', description: 'Sujet du message' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: 'Bonjour, je souhaite en savoir plus...', description: 'Contenu du message' })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  message: string;
}